import { useState } from 'react'
import ChatWidget from '../components/ChatWidget'
import LanguageToggle from '../components/LanguageToggle'

export default function Home(){
  const [lang, setLang] = useState('ar')
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">الاستشارات القانونية الذكية</h1>
        <LanguageToggle lang={lang} setLang={setLang} />
      </header>

      <main className="max-w-4xl mx-auto mt-8">
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{lang==='ar' ? 'احصل على استشارتك الآن' : 'Get your legal consultation'}</h2>
          <p className="mt-2 text-sm text-gray-600">{lang==='ar' ? 'اختر اللغة والأسلوب ثم تحدث مع المساعد.' : 'Choose language and tone, then chat with the assistant.'}</p>

          <ChatWidget lang={lang} />
        </section>
      </main>
    </div>
  )
}
