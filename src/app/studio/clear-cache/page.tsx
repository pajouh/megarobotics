'use client'

import { useState } from 'react'

export default function ClearCachePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [customPath, setCustomPath] = useState('')

  const clearCache = async (purgeAll = false) => {
    setStatus('loading')
    setMessage(purgeAll ? 'Purging entire site cache...' : 'Clearing all cache...')
    setResults([])

    try {
      // Call the revalidate API with secret - clear ALL paths including dynamic ones
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: 'megarobotics-revalidate-2024',
          all: true,
          purgeAll: purgeAll,
          // Also include common dynamic routes
          paths: [
            '/manufacturers/limx-dynamics',
            '/products/limx-oli',
          ],
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage('Cache cleared successfully! Please wait a few seconds and hard refresh (Ctrl+Shift+R) your browser.')
        setResults(data.revalidated || [])
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to clear cache')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error: ' + String(error))
    }
  }

  const clearSpecificPath = async (path: string) => {
    if (!path.trim()) return

    setStatus('loading')
    setMessage(`Clearing cache for ${path}...`)

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: 'megarobotics-revalidate-2024',
          paths: [path],
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        setMessage(`Cache cleared for ${path}! Hard refresh (Ctrl+Shift+R) to see changes.`)
        setResults(data.revalidated || [])
      } else {
        setStatus('error')
        setMessage(data.error || 'Failed to clear cache')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error: ' + String(error))
    }
  }

  const specificPaths = [
    { label: 'Homepage', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Manufacturers', path: '/manufacturers' },
    { label: 'Articles', path: '/articles' },
    { label: 'Guides', path: '/guides' },
    { label: 'About', path: '/about' },
  ]

  const manufacturerPaths = [
    { label: 'LimX Dynamics', path: '/manufacturers/limx-dynamics' },
    { label: 'Unitree', path: '/manufacturers/unitree' },
    { label: 'Boston Dynamics', path: '/manufacturers/boston-dynamics' },
    { label: 'Deep Robotics', path: '/manufacturers/deep-robotics' },
  ]

  const productPaths = [
    { label: 'LimX OLI', path: '/products/limx-oli' },
    { label: 'Unitree G1', path: '/products/unitree-g1' },
    { label: 'Unitree Go2', path: '/products/unitree-go2' },
    { label: 'Spot', path: '/products/spot' },
  ]

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Clear Website Cache</h1>
          <p className="text-gray-600 mb-6">
            Use this tool to refresh the website after making changes in Sanity Studio.
          </p>

          {/* Status Message */}
          {message && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                status === 'success'
                  ? 'bg-green-100 text-green-800'
                  : status === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {message}
              {results.length > 0 && (
                <ul className="mt-2 text-sm">
                  {results.map((path) => (
                    <li key={path}>✓ {path}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Purge All Button - Most aggressive */}
          <button
            onClick={() => clearCache(true)}
            disabled={status === 'loading'}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-3"
          >
            {status === 'loading' ? 'Purging...' : '🔥 PURGE ENTIRE SITE CACHE'}
          </button>
          <p className="text-xs text-gray-500 text-center mb-4">Use this if images are not updating. Clears ALL cached pages.</p>

          {/* Clear All Button */}
          <button
            onClick={() => clearCache(false)}
            disabled={status === 'loading'}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors mb-6"
          >
            {status === 'loading' ? 'Clearing...' : 'Clear Main Pages Cache'}
          </button>

          {/* Custom Path */}
          <div className="border-t pt-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Clear Custom Path</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                placeholder="/manufacturers/limx-dynamics"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                onClick={() => clearSpecificPath(customPath)}
                disabled={status === 'loading' || !customPath.trim()}
                className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Product Pages */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Pages</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {productPaths.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => clearSpecificPath(path)}
                  disabled={status === 'loading'}
                  className="bg-purple-50 hover:bg-purple-100 disabled:bg-gray-50 text-purple-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Manufacturer Pages */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Manufacturer Pages</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {manufacturerPaths.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => clearSpecificPath(path)}
                  disabled={status === 'loading'}
                  className="bg-blue-50 hover:bg-blue-100 disabled:bg-gray-50 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Pages */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Main Pages</h2>
            <div className="grid grid-cols-2 gap-3">
              {specificPaths.map(({ label, path }) => (
                <button
                  key={path}
                  onClick={() => clearSpecificPath(path)}
                  disabled={status === 'loading'}
                  className="bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Notes:</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• <strong>After clearing cache, do a hard refresh:</strong> Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)</li>
              <li>• Next.js caches pages for up to 60 seconds</li>
              <li>• Images from Sanity CDN may also be cached - hard refresh helps</li>
              <li>• If the logo still shows wrong, try opening in incognito/private window</li>
            </ul>
          </div>

          {/* Back to Studio Link */}
          <div className="mt-6 text-center">
            <a
              href="/studio"
              className="text-emerald-600 hover:text-emerald-700 font-medium"
            >
              ← Back to Sanity Studio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
