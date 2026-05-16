import { useRef, useState, useCallback, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

interface Props {
  onPhoto: (dataUrl: string) => void
}

export default function PhotoCapture({ onPhoto }: Props) {
  const { t } = useLanguage()
  const fileRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')
  const streamRef = useRef<MediaStream | null>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => onPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  const startCamera = useCallback(async () => {
    setError('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      })
      streamRef.current = stream
      setStreaming(true)
    } catch {
      setError(t.capture.error)
    }
  }, [t.capture.error])

  useEffect(() => {
    const video = videoRef.current
    const stream = streamRef.current
    if (!streaming || !video || !stream) return

    video.srcObject = stream
    video.onloadedmetadata = () => {
      video.play().catch(() => {})
    }

    return () => {
      video.onloadedmetadata = null
    }
  }, [streaming])

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setStreaming(false)
  }, [])

  const capture = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.videoWidth) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')!.drawImage(video, 0, 0)
    onPhoto(canvas.toDataURL('image/jpeg', 0.95))
    stopCamera()
  }, [onPhoto, stopCamera])

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-bold">{t.capture.heading}</h2>

      {!streaming ? (
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-dashed border-gray-600 hover:border-orange-400 hover:bg-orange-400/10 transition-colors cursor-pointer"
          >
            <span className="text-4xl">🖼️</span>
            <span className="font-medium">{t.capture.fromDevice}</span>
          </button>
          <button
            onClick={startCamera}
            className="flex-1 flex flex-col items-center gap-2 p-6 rounded-2xl border-2 border-dashed border-gray-600 hover:border-orange-400 hover:bg-orange-400/10 transition-colors cursor-pointer"
          >
            <span className="text-4xl">📷</span>
            <span className="font-medium">{t.capture.fromCamera}</span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <video
            ref={videoRef}
            className="w-full rounded-2xl bg-black"
            playsInline
            autoPlay
            muted
          />
          <div className="flex gap-3">
            <button
              onClick={capture}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-400 rounded-xl font-bold text-lg transition-colors"
            >
              {t.capture.shoot}
            </button>
            <button
              onClick={stopCamera}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors"
            >
              {t.capture.cancel}
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}
