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
          className={`flex gap-4 p-5 rounded-lg ${
            isDark
              ? 'bg-[color:var(--ind-graphite-800)] border border-[color:var(--ind-graphite-700)]'
              : 'bg-white border border-[color:var(--ind-steel-200)]'
          }`}
        >
          <span className="ind-step-num">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span
            className={`text-sm leading-relaxed pt-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  )
}
