import jwt from 'jsonwebtoken'

const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'change_me'
const JWT_SECRET = process.env.JWT_SECRET || 'shh'

export default async function handler(req,res){
  if(req.method === 'POST'){
    const { password } = req.body
    if(password === ADMIN_PASS){
      const token = jwt.sign({ role:'admin' }, JWT_SECRET, { expiresIn: '8h' })
      return res.json({ token })
    }
    return res.status(401).json({ error:'Invalid' })
  }
  res.status(405).end()
}
