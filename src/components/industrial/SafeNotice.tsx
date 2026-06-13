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
        isDark ? 'bg-[color:var(--mr-dark-2)]/70' : 'bg-[color:var(--mr-white)]'
      } py-3 pr-4`}
      role="note"
    >
      {label && (
        <div
          className={`flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.12em] mb-1 ${
            isDark ? 'text-[color:var(--mr-accent)]' : 'text-[color:var(--mr-accent-ink)]'
          }`}
        >
          <Info className="w-3.5 h-3.5" aria-hidden="true" />
          {label}
        </div>
      )}
      <div className={`text-sm leading-relaxed ${isDark ? 'text-[color:var(--mr-steel-on-dark)]' : 'text-[color:var(--mr-ink-2)]'}`}>
        {children}
      </div>
    </aside>
  )
}
