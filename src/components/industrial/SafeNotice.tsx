import { Info } from 'lucide-react'

interface SafeNoticeProps {
  label?: string
  children: React.ReactNode
  accent?: 'blue' | 'orange'
  tone?: 'light' | 'dark'
}

export default function SafeNotice({
  label,
  children,
  accent = 'blue',
  tone = 'light',
}: SafeNoticeProps) {
  const accentClass = accent === 'orange' ? 'ind-rule-orange' : 'ind-rule-blue'
  const isDark = tone === 'dark'
  return (
    <aside
      className={`${accentClass} ${
        isDark ? 'bg-[color:var(--ind-graphite-800)]/60' : 'bg-white'
      } py-3 pr-4`}
      role="note"
    >
      {label && (
        <div
          className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1 ${
            isDark ? 'text-blue-300' : 'text-blue-700'
          }`}
        >
          <Info className="w-3.5 h-3.5" aria-hidden="true" />
          {label}
        </div>
      )}
      <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        {children}
      </div>
    </aside>
  )
}
