import { useState } from 'react'
import PhotoCapture from './components/PhotoCapture'
import PhotoCrop from './components/PhotoCrop'
import PrintLayout from './components/PrintLayout'

type Step = 'capture' | 'crop' | 'layout'

const STEPS: { key: Step; label: string }[] = [
  { key: 'capture', label: '1. เลือกรูป' },
  { key: 'crop',    label: '2. Crop' },
  { key: 'layout',  label: '3. Download' },
]

export default function App() {
  const [step, setStep] = useState<Step>('capture')
  const [rawPhoto, setRawPhoto] = useState('')
  const [croppedPhoto, setCroppedPhoto] = useState('')

  const reset = () => {
    setRawPhoto('')
    setCroppedPhoto('')
    setStep('capture')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📸</span>
          <span className="font-bold text-xl tracking-tight">Picard</span>
          <span className="text-gray-500 text-sm ml-1">ถ่ายรูปติดบัตร</span>
        </div>
        <a
          href="https://thana.in.th"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
        >
          thana.in.th
        </a>
      </header>

      {/* Step indicator */}
      <div className="flex justify-center gap-1 pt-6 px-4">
        {STEPS.map(({ key, label }, i) => {
          const isActive = step === key
          const isDone =
            (key === 'capture' && (step === 'crop' || step === 'layout')) ||
            (key === 'crop' && step === 'layout')
          return (
            <div key={key} className="flex items-center gap-1">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-500 text-white'
                    : isDone
                    ? 'bg-orange-900/40 text-orange-400'
                    : 'bg-gray-800 text-gray-500'
                }`}
              >
                {isDone ? '✓ ' : ''}{label}
              </div>
              {i < STEPS.length - 1 && (
                <span className="text-gray-700">→</span>
              )}
            </div>
          )
        })}
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {step === 'capture' && (
            <PhotoCapture
              onPhoto={(url) => {
                setRawPhoto(url)
                setStep('crop')
              }}
            />
          )}
          {step === 'crop' && rawPhoto && (
            <PhotoCrop
              src={rawPhoto}
              onCrop={(url) => {
                setCroppedPhoto(url)
                setStep('layout')
              }}
              onBack={() => setStep('capture')}
            />
          )}
          {step === 'layout' && croppedPhoto && (
            <PrintLayout
              croppedDataUrl={croppedPhoto}
              onBack={() => setStep('crop')}
              onReset={reset}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-4 text-center text-gray-600 text-xs">
        Picard Web — ถ่ายรูปติดบัตรออนไลน์ ฟรี ไม่เก็บรูปของคุณ ทุกอย่างทำงานใน browser
      </footer>
    </div>
  )
}
