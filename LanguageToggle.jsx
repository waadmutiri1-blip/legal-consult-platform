export default function LanguageToggle({lang, setLang}){
  return (
    <div className="flex items-center gap-2">
      <button onClick={()=>setLang('ar')} className={`px-3 py-1 rounded ${lang==='ar' ? 'bg-blue-600 text-white':'bg-white'}`}>العربية</button>
      <button onClick={()=>setLang('en')} className={`px-3 py-1 rounded ${lang==='en' ? 'bg-blue-600 text-white':'bg-white'}`}>English</button>
    </div>
  )
}
