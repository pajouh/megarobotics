import 'server-only'

// IndexNow — tell Bing (and Yandex, Seznam, Naver) that a URL changed, instead
// of waiting for the next scheduled crawl. Bing lists this as the top
// recommendation on the megarobotics.de Webmaster Tools account.
//
// The key is deliberately NOT a secret. The protocol requires it to be publicly
// fetchable at https://<host>/<key>.txt so the search engine can confirm we own
// the host, so it lives in the repo next to the file that serves it. If the two
// ever disagree, every submission is rejected with 403.
//
//   key constant below  ===  public/<key>.txt
//
// To rotate: generate a new value, rename the public file to match, change this
// constant. Nothing else references it.
const INDEXNOW_KEY = 'd9b4a7904fd09dea65495f05cf9745d2'

const HOST = 'www.megarobotics.de'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/IndexNow'

// The protocol caps a single submission at 10,000 URLs. We send a handful per
// publish, so this only guards against a future caller looping over the catalog.
const MAX_URLS = 10_000

// Don't let a slow or hanging IndexNow endpoint stall the Sanity webhook — the
// cache revalidation has already happened by the time we get here, and a missed
// ping costs nothing worse than waiting for the normal crawl.
const TIMEOUT_MS = 5_000

/**
 * Submit changed paths to IndexNow.
 *
 * Never throws and never rejects: search-engine notification is best-effort and
 * must not turn a successful publish into a failed webhook. Returns what
 * happened so the caller can include it in the response body.
 *
 * @param paths Site-root-relative paths, e.g. ['/products/rg2', '/de/products/rg2']
 */
export async function submitToIndexNow(
  paths: string[]
): Promise<{ submitted: number; ok: boolean; status?: number; error?: string }> {
  // Drop the pseudo-entries the revalidation handler uses for logging
  // (e.g. '/products (layout)') and anything that isn't a real path.
  const urlList = [...new Set(paths)]
    .filter((p) => p.startsWith('/') && !p.includes(' '))
    .slice(0, MAX_URLS)
    .map((p) => `${ORIGIN}${p}`)

  if (urlList.length === 0) {
    return { submitted: 0, ok: true }
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${ORIGIN}/${INDEXNOW_KEY}.txt`,
        urlList,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    // 200 accepted, 202 accepted but key validation pending. Anything else is a
    // real problem worth seeing in the function logs: 403 means the key file
    // doesn't match, 422 means the URLs don't belong to the declared host.
    const ok = response.status === 200 || response.status === 202
    if (!ok) {
      console.error(`[IndexNow] Rejected with ${response.status} for ${urlList.length} URL(s)`)
    } else {
      console.log(`[IndexNow] Submitted ${urlList.length} URL(s) — ${response.status}`)
    }

    return { submitted: urlList.length, ok, status: response.status }
  } catch (error) {
    console.error('[IndexNow] Submission failed:', error)
    return { submitted: 0, ok: false, error: String(error) }
  }
}
