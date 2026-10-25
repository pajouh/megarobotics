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
}: SafeNoticeProps) {
  const accentClass = accent === 'orange' ? 'ind-rule-orange' : 'ind-rule-blue'
  return (
    <aside
      className={`${accentClass} rounded-r-xl bg-[color:var(--mr-accent-soft)] py-3 pr-4`}
      role="note"
    >
      {label && (
        <div
          className={`flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.12em] mb-1 ${
            'text-[color:var(--mr-accent-ink)]'
          }`}
        >
          <Info className="w-3.5 h-3.5" aria-hidden="true" />
          {label}
        </div>
      )}
      <div className="text-sm leading-relaxed text-[color:var(--mr-ink-2)]">
        {children}
      </div>
    </aside>
  )
}
