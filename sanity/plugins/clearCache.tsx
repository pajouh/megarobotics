'use client'

import { definePlugin } from 'sanity'
import { RefreshCw } from 'lucide-react'
import { useState } from 'react'

function ClearCacheTool() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; error?: string; timestamp?: string } | null>(null)

  const handleClearCache = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: 'megarobotics-revalidate-2024',
          all: true,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ success: true, timestamp: data.timestamp })
      } else {
        setResult({ error: data.error || 'Failed to clear cache' })
      }
    } catch (error) {
      setResult({ error: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Cache Management
      </h1>

      <p style={{ color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
        After making changes in the CMS, click the button below to clear the website cache
        and see your updates immediately on the live site.
      </p>

      <button
        onClick={handleClearCache}
        disabled={loading}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 24px',
          backgroundColor: loading ? '#ccc' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s',
        }}
      >
        <RefreshCw
          size={20}
          style={{
            animation: loading ? 'spin 1s linear infinite' : 'none'
          }}
        />
        {loading ? 'Clearing Cache...' : 'Clear Website Cache'}
      </button>

      {result && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: result.success ? '#d1fae5' : '#fee2e2',
            color: result.success ? '#065f46' : '#991b1b',
          }}
        >
          {result.success ? (
            <>
              <strong>Cache cleared successfully!</strong>
              <br />
              <small>Cleared at: {result.timestamp}</small>
            </>
          ) : (
            <>
              <strong>Error:</strong> {result.error}
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ marginTop: '32px', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
          When to clear cache:
        </h3>
        <ul style={{ fontSize: '14px', color: '#666', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>After updating Site Settings (contact info, social links)</li>
          <li>After editing the About, Imprint, or Privacy pages</li>
          <li>When changes don&apos;t appear on the live site</li>
        </ul>
      </div>
    </div>
  )
}

export const clearCachePlugin = definePlugin({
  name: 'clear-cache',
  tools: [
    {
      name: 'clear-cache',
      title: 'Clear Cache',
      icon: RefreshCw,
      component: ClearCacheTool,
    },
  ],
})
