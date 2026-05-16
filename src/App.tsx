import { useState } from 'react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import PhotoCapture from './components/PhotoCapture'
import PhotoCrop from './components/PhotoCrop'
import PrintLayout from './components/PrintLayout'

type Step = 'capture' | 'crop' | 'layout'

function AppContent() {
  const { lang, t, toggle } = useLanguage()
  const [step, setStep] = useState<Step>('capture')
  const [rawPhoto, setRawPhoto] = useState('')
  const [croppedPhoto, setCroppedPhoto] = useState('')

  const STEPS: { key: Step; label: string }[] = [
    { key: 'capture', label: t.step.capture },
    { key: 'crop',    label: t.step.crop },
    { key: 'layout',  label: t.step.download },
  ]

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
          <span className="text-gray-500 text-sm ml-1">{t.appSubtitle}</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-0.5 text-sm font-medium rounded-lg overflow-hidden border border-gray-700"
            aria-label="Toggle language"
          >
            <span className={`px-2.5 py-1 transition-colors ${lang === 'th' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}>
              TH
            </span>
            <span className={`px-2.5 py-1 transition-colors ${lang === 'en' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}>
              EN
            </span>
          </button>
          <a
            href="https://thana.in.th"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            thana.in.th
          </a>
        </div>
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
        Picard Web — {t.footer}
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
