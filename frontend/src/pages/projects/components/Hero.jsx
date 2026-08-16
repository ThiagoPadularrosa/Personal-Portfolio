export default function Hero() {
  return (
    <section className="bg-white flex items-center justify-between px-[5%] py-16 gap-8 min-h-85 flex-col md:flex-row">
      {/* Text */}
      <div className="max-w-140 animate-fade-up">
        <h1 className="font-courier text-[clamp(2rem,4vw,3rem)] font-bold text-[#1a1a2e] mb-5 leading-tight">
          My Javascript Projects
        </h1>
        <p className="text-[#718096] leading-[1.7] mb-8">
          Here you can find some of my{' '}
          <em className="font-courier font-bold not-italic text-[#1a1a2e] text-[1.05em]">
            javascript
          </em>{' '}
          projects, I hope you like them. If you are curious how I learned it
          check out my documents in the button below.
        </p>
        <a
          href="#"
          className="inline-block bg-[#2d3748] text-white px-8 py-3 rounded-lg font-semibold text-[0.85rem] tracking-widest uppercase shadow-yellow transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-yellow-lg no-underline"
        >
          Learn More
        </a>
      </div>

      {/* Illustration */}
      <div className="dot-grid relative shrink-0 w-full md:w-[min(380px,45vw)] h-60 bg-linear-to-br from-[#f0f4f8] to-[#e2e8f0] rounded-2xl overflow-hidden flex items-center justify-center animate-fade-up-delay">
        {/* Floating labels */}
        <div className="absolute top-4.5 left-4.5 bg-white rounded-md px-2.5 py-1.5 text-[0.65rem] font-semibold text-[#e74c3c] border-l-[3px] border-[#e74c3c] shadow-md">
          HueShift
        </div>
        <div className="absolute top-15 left-7.5 bg-[#f7fafc] text-[#718096] rounded-md px-2.5 py-1.5 text-[0.58rem] font-semibold shadow-md">
          Simple Hex
        </div>

        {/* Red decoration squares */}
        <div className="absolute bg-[#e74c3c] rounded-sm" style={{ width:14, height:14, top:28, right:110, opacity:0.8 }} />
        <div className="absolute bg-[#e74c3c] rounded-sm" style={{ width:9,  height:9,  top:50, right:130, opacity:0.5 }} />
        <div className="absolute bg-[#e74c3c] rounded-sm" style={{ width:18, height:18, bottom:40, right:90, opacity:0.7 }} />

        {/* JS badge */}
        <div className="absolute right-7 top-1/2 translate-y-[60%] font-courier text-[4.5rem] font-bold text-[#1a1a2e] opacity-85 leading-none">
          <span className="text-[#e74c3c]">J</span>S
        </div>

        {/* Person SVG */}
        <svg className="absolute left-12.5 bottom-0" width="140" height="200" viewBox="0 0 140 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="70" cy="32" r="20" fill="#f4a97f"/>
          <ellipse cx="70" cy="16" rx="20" ry="10" fill="#1a1a2e"/>
          <rect x="42" y="52" width="56" height="60" rx="8" fill="#e74c3c"/>
          <rect x="18" y="62" width="28" height="12" rx="6" fill="#e74c3c" transform="rotate(-10 18 62)"/>
          <rect x="94" y="70" width="28" height="12" rx="6" fill="#e74c3c"/>
          <rect x="50" y="108" width="16" height="55" rx="6" fill="#2d3748"/>
          <rect x="74" y="108" width="16" height="55" rx="6" fill="#2d3748"/>
          <rect x="46" y="156" width="22" height="10" rx="4" fill="#1a1a2e"/>
          <rect x="72" y="156" width="22" height="10" rx="4" fill="#1a1a2e"/>
          <rect x="-10" y="50" width="34" height="26" rx="3" fill="#2d3748" opacity="0.85"/>
          <rect x="-8" y="52" width="30" height="20" rx="2" fill="#4a9eff" opacity="0.3"/>
          <rect x="5" y="165" width="10" height="20" rx="3" fill="#8b7355"/>
          <ellipse cx="10" cy="158" rx="12" ry="14" fill="#48bb78" opacity="0.8"/>
          <ellipse cx="22" cy="164" rx="9" ry="10" fill="#38a169" opacity="0.7"/>
        </svg>
      </div>
    </section>
  )
}
