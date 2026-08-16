import { useState } from 'react'

export default function CounterPreview() {
  const [count, setCount] = useState(0)

  const countColor =
    count > 0 ? '#27ae60' : count < 0 ? '#e74c3c' : '#2d3748'

  return (
    <div className="w-full h-45 bg-[#f9fafb] flex flex-col items-center justify-center gap-2 relative">
      {/* Window dots */}
      <div className="absolute top-3 flex gap-1.5">
        <span className="w-1.75 h-1.75 rounded-full bg-[#e74c3c]" />
        <span className="w-1.75 h-1.75 rounded-full bg-[#f1c40f]" />
      </div>

      <p className="font-semibold text-[#2d3748] text-[0.9rem] mt-3">Counter</p>

      <p
        className="text-[2.5rem] font-light leading-none transition-colors"
        style={{ color: countColor }}
      >
        {count}
      </p>

      <div className="flex gap-2.5">
        {[
          { label: 'decrease', action: () => setCount((c) => c - 1) },
          { label: 'reset',    action: () => setCount(0) },
          { label: 'increase', action: () => setCount((c) => c + 1) },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={action}
            className="w-15 h-6.5 border border-[#cbd5e0] rounded-full bg-transparent text-[0.65rem] text-[#718096] cursor-pointer hover:border-[#4a9eff] hover:text-[#4a9eff] transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
