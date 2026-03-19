import { google } from 'googleapis'

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!email || !key) return null

  return new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export async function appendSubscriber(email: string) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  if (!sheetId) {
    console.warn('GOOGLE_SHEET_ID not configured, skipping sheet append')
    return
  }

  const auth = getAuth()
  if (!auth) {
    console.warn('Google service account not configured, skipping sheet append')
    return
  }

  const sheets = google.sheets({ version: 'v4', auth })

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:B',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[email, new Date().toISOString()]],
    },
  })
}
