import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import type { PhotoSize } from '../utils/canvas'
import { buildPrintLayout } from '../utils/canvas'
import SizeSelector from './SizeSelector'

interface Props {
  croppedDataUrl: string
  onBack: () => void
  onReset: () => void
}

export default function PrintLayout({ croppedDataUrl, onBack, onReset }: Props) {
  const { t } = useLanguage()
  const [size, setSize] = useState<PhotoSize>('1in')
  const previewRef = useRef<HTMLCanvasElement>(null)
  const [layoutCanvas, setLayoutCanvas] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const canvas = buildPrintLayout(img, size)
      setLayoutCanvas(canvas)
      if (previewRef.current) {
        const ctx = previewRef.current.getContext('2d')!
        previewRef.current.width = canvas.width
        previewRef.current.height = canvas.height
        ctx.drawImage(canvas, 0, 0)
      }
    }
    img.src = croppedDataUrl
  }, [croppedDataUrl, size])

  const handleDownload = () => {
    if (!layoutCanvas) return
    const link = document.createElement('a')
    link.download = `picard-${size}.jpg`
    link.href = layoutCanvas.toDataURL('image/jpeg', 0.95)
    link.click()
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold">{t.layout.heading}</h2>

      <SizeSelector selected={size} onChange={setSize} />

      <div className="w-full max-w-sm border border-gray-700 rounded-xl overflow-hidden bg-white">
        <canvas ref={previewRef} className="w-full h-auto" />
      </div>

      <p className="text-gray-400 text-sm">{t.layout.hint}</p>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
        >
          {t.layout.recrop}
        </button>
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-400 rounded-xl font-bold text-lg transition-colors"
        >
          {t.layout.download}
        </button>
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
        >
          {t.layout.reset}
        </button>
      </div>
    </div>
  )
}
