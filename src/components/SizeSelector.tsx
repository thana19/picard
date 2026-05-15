import type { PhotoSize } from '../utils/canvas'
import { photoCount } from '../utils/canvas'

interface Props {
  selected: PhotoSize
  onChange: (size: PhotoSize) => void
}

const SIZES: { value: PhotoSize; label: string; desc: string }[] = [
  { value: '1in',   label: '1 นิ้ว',   desc: '300×400 px' },
  { value: '1.5in', label: '1.5 นิ้ว', desc: '450×600 px' },
  { value: '2in',   label: '2 นิ้ว',   desc: '600×800 px' },
]

export default function SizeSelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h3 className="text-lg font-semibold text-gray-300">เลือกขนาดรูป</h3>
      <div className="flex gap-3">
        {SIZES.map(({ value, label, desc }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`flex flex-col items-center gap-1 px-5 py-4 rounded-xl border-2 transition-all ${
              selected === value
                ? 'border-orange-400 bg-orange-400/20 text-orange-300'
                : 'border-gray-600 hover:border-gray-400 text-gray-400'
            }`}
          >
            <span className="font-bold text-lg">{label}</span>
            <span className="text-xs">{desc}</span>
            <span className="text-xs mt-1 opacity-70">{photoCount(value)} รูป/แผ่น</span>
          </button>
        ))}
      </div>
    </div>
  )
}
