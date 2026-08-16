import { useState } from 'react'

export default function HueShiftPreview() {
  const [bg, setBg] = useState('#F1f5f8')
  const [hex, setHex] = useState('#F1f5f8')

  const handleClick = () => {
    const newHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    setBg(newHex)
    setHex(newHex)
  }

  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  const textColor = lum > 0.5 ? '#222' : '#eee'

  return (
    <div
      className="w-full h-45 flex flex-col items-center justify-center gap-3 relative transition-colors duration-300"
      style={{ background: bg }}
    >
      <div className="absolute top-0 left-0 right-0 flex justify-between px-3.5 py-2 text-[0.65rem] text-[#888] bg-[#111]">
        <span>HueShift</span>
        <span>Simple Hex</span>
      </div>
      <div
        className="bg-[#2d2d2d] border border-[#444] rounded px-4 py-2 text-[0.75rem] text-[#aaa] font-mono mt-4"
      >
        Background Color : <span className="font-bold text-blue-400">{hex}</span>
      </div>
      <button
        onClick={handleClick}
        className="border border-[#555] text-[#aaa] bg-[#2d2d2d] text-[0.65rem] px-5 py-1.5 rounded cursor-pointer hover:border-[#999] transition-colors"
      >
        CLICK ME !
      </button>
    </div>
  )
}
