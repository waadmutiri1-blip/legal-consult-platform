import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

const DB_PATH = path.join(process.cwd(), 'db', 'database.sqlite')
if(!fs.existsSync(path.dirname(DB_PATH))) fs.mkdirSync(path.dirname(DB_PATH), {recursive:true})
const db = new Database(DB_PATH)
db.prepare(`CREATE TABLE IF NOT EXISTS consultations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  contact TEXT,
  lang TEXT,
  tone TEXT,
  messages TEXT,
  created_at TEXT
)`).run()

export default function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end()
  const { name='', contact='', lang='ar', tone='friendly', messages=[] } = req.body
  const stmt = db.prepare('INSERT INTO consultations (name, contact, lang, tone, messages, created_at) VALUES (?,?,?,?,?,?)')
  stmt.run(name, contact, lang, tone, JSON.stringify(messages), new Date().toISOString())
  res.json({ ok: true })
}
