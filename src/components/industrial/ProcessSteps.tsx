interface ProcessStepsProps {
  steps: string[]
  tone?: 'light' | 'dark'
}

// `tone` is kept for callers; every band is light now, so both tones render the same card.
export default function ProcessSteps({ steps }: ProcessStepsProps) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {steps.map((step, idx) => (
        <li
          key={idx}
          data-reveal
          style={{ ['--d' as string]: `${idx * 60}ms` }}
          className="ind-card !p-5 flex gap-4"
        >
          <span className="ind-step-num">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span
            className="text-sm leading-relaxed pt-1.5 text-[color:var(--mr-ink-2)]"
          >
            {step}
          </span>
        </li>
      ))}
    </ol>
  )
}
