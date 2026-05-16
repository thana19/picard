import { createContext, useContext, useState, type ReactNode } from 'react'
import translations, { type Lang, type Translations } from './translations'

interface LanguageContextValue {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'picard_lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved === 'en' ? 'en' : 'th'
  })

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === 'th' ? 'en' : 'th'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
