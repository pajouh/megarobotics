interface ProcessStepsProps {
  steps: string[]
  tone?: 'light' | 'dark'
}

export default function ProcessSteps({ steps, tone = 'light' }: ProcessStepsProps) {
  const isDark = tone === 'dark'
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {steps.map((step, idx) => (
        <li
          key={idx}
          className={`flex gap-4 p-5 ${
            isDark
              ? 'bg-[color:var(--mr-dark-2)] border border-[color:var(--ind-graphite-700)]'
              : 'bg-[color:var(--mr-white)] border border-[color:var(--mr-line)]'
          }`}
        >
          <span className="ind-step-num">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span
            className={`text-sm leading-relaxed pt-1.5 ${isDark ? 'text-[color:var(--mr-ink-on-dark)]' : 'text-[color:var(--mr-ink-2)]'}`}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  )
}
