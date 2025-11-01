import OpenAI from 'openai'
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { messages = [], tone='friendly', lang='ar' } = req.body

  const system = lang==='ar'
    ? (tone==='formal' ? 'أنت مساعد قانوني رسمي باللغة العربية. اشرح بشكل مختصر ودقيق.' : 'أنت مساعد ودود باللغة العربية. طمئن المستخدم واجمع التفاصيل.')
    : (tone==='formal' ? 'You are a formal legal assistant in English. Provide concise accurate guidance.' : 'You are a friendly assistant in English. Reassure and collect details.')

  const promptMessages = [
    { role: 'system', content: system },
    ...messages.map(m=> ({ role: m.role === 'user' ? 'user':'assistant', content: m.text }))
  ]

  try{
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: promptMessages,
      max_tokens: 600
    })
    const reply = completion.choices[0].message.content
    res.json({ reply })
  }catch(err){
    console.error(err)
    res.status(500).json({ error: 'AI error' })
  }
}
