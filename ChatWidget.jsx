import { useState } from 'react'

export default function ChatWidget({lang='ar'}){
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [tone, setTone] = useState('friendly') // 'friendly' or 'formal'
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)

  async function send(){
    if(!input) return
    const userMsg = {role:'user', text: input}
    setMessages(prev=>[...prev, userMsg])
    setLoading(true)
    try{
      const res = await fetch('/api/ai',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({messages:[...messages, userMsg], tone, lang})
      })
      const data = await res.json()
      const aiMsg = {role:'ai', text: data.reply}
      setMessages(prev=>[...prev, aiMsg])
    }catch(e){
      setMessages(prev=>[...prev, {role:'ai', text: lang==='ar' ? 'حدث خطأ، حاول مرة أخرى.' : 'An error occurred.'}])
    }finally{setLoading(false); setInput('')}
  }

  async function submitForReview(){
    const payload = {name, contact, lang, tone, messages}
    await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)})
    alert(lang==='ar' ? 'تم إرسال الاستشارة للمختصين.' : 'Your consultation has been submitted.')
  }

  return (
    <div className="mt-4">
      <div className="flex gap-2 items-center mb-3">
        <label className="text-sm">{lang==='ar' ? 'الأسلوب' : 'Tone'}</label>
        <select value={tone} onChange={e=>setTone(e.target.value)} className="border px-2 py-1 rounded">
          <option value="friendly">{lang==='ar' ? 'ودّي ومطمئن' : 'Friendly'}</option>
          <option value="formal">{lang==='ar' ? 'قانوني ورسمي' : 'Legal/Formal'}</option>
        </select>
      </div>

      <div className="h-64 overflow-auto border p-3 rounded bg-gray-100">
        {messages.map((m,i)=> (
          <div key={i} className={`mb-2 ${m.role==='user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded ${m.role==='user' ? 'bg-blue-600 text-white':'bg-white border'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder={lang==='ar' ? 'اكتب هنا...' : 'Type here...'} className="flex-1 border p-2 rounded" />
        <button onClick={send} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? '...' : (lang==='ar' ? 'إرسال' : 'Send')}</button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <input placeholder={lang==='ar' ? 'الاسم (اختياري)' : 'Name (optional)'} value={name} onChange={e=>setName(e.target.value)} className="border p-2 rounded" />
        <input placeholder={lang==='ar' ? 'رقم/بريد للتواصل' : 'Contact (phone/email)'} value={contact} onChange={e=>setContact(e.target.value)} className="border p-2 rounded" />
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={submitForReview} className="px-4 py-2 bg-blue-600 text-white rounded">{lang==='ar' ? 'أرسل للمختصين' : 'Submit to specialists'}</button>
      </div>
    </div>
  )
}
