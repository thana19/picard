import { useState, useRef, useCallback } from 'react'
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface Props {
  src: string
  onCrop: (croppedDataUrl: string) => void
  onBack: () => void
}

function centerAspectCrop(w: number, h: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 80 }, aspect, w, h),
    w,
    h,
  )
}

export default function PhotoCrop({ src, onCrop, onBack }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget
    // 1:1.33 ratio — standard portrait ID photo (3:4)
    setCrop(centerAspectCrop(w, h, 3 / 4))
  }, [])

  const handleConfirm = useCallback(() => {
    const img = imgRef.current
    if (!img || !crop) return

    // crop is in % units — convert directly to natural image pixels, no scaleX/Y needed
    const cropX = (crop.x / 100) * img.naturalWidth
    const cropY = (crop.y / 100) * img.naturalHeight
    const cropW = (crop.width / 100) * img.naturalWidth
    const cropH = (crop.height / 100) * img.naturalHeight

    const canvas = document.createElement('canvas')
    canvas.width = cropW
    canvas.height = cropH

    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH)

    onCrop(canvas.toDataURL('image/jpeg', 0.95))
  }, [crop, onCrop])

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold">ปรับขอบรูป</h2>
      <p className="text-gray-400 text-sm">ลากเพื่อปรับตำแหน่งและขนาด</p>

      <div className="max-w-md w-full">
        <ReactCrop
          crop={crop}
          onChange={(_, pct) => setCrop(pct)}
          aspect={3 / 4}
          className="rounded-xl overflow-hidden"
        >
          <img
            ref={imgRef}
            src={src}
            onLoad={onImageLoad}
            className="max-w-full"
            alt="รูปที่เลือก"
          />
        </ReactCrop>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
        >
          ← กลับ
        </button>
        <button
          onClick={handleConfirm}
          className="px-8 py-3 bg-orange-500 hover:bg-orange-400 rounded-xl font-bold transition-colors"
        >
          ยืนยัน Crop →
        </button>
      </div>
    </div>
  )
}
