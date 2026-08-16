export default function ReviewsPreview() {
  return (
    <div className="w-full h-45 bg-[#f7fafc] flex flex-col items-center justify-center gap-2 px-3.5">
      <p className="font-semibold text-[0.8rem] text-[#2d3748]">Our Reviews</p>
      <div className="bg-white rounded-lg px-3 py-2.5 w-full text-center shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
        <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#4a9eff] to-[#667eea] mx-auto mb-1.5 flex items-center justify-center text-white text-[0.7rem] font-bold">
          AZ
        </div>
        <p className="text-[0.7rem] font-semibold text-[#2d3748]">Ahmad Zolo</p>
        <p className="text-[0.6rem] text-[#a0aec0] leading-snug mt-0.5">
          This project helped me understand DOM manipulation in JavaScript deeply.
        </p>
        <div className="mt-1.5 flex justify-center gap-1">
          {['prev', 'next'].map((btn) => (
            <button
              key={btn}
              className="border border-[#e2e8f0] rounded-full px-3 py-0.5 text-[0.6rem] text-[#718096] bg-transparent cursor-pointer hover:border-[#4a9eff] hover:text-[#4a9eff] transition-colors"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
