import { readFileSync } from 'fs'
import Database from 'better-sqlite3'
import path from 'path'
const db = new Database(path.join(process.cwd(), 'db', 'database.sqlite'))
export default function handler(req,res){
  const rows = db.prepare('SELECT * FROM consultations ORDER BY created_at DESC').all()
  res.json(rows)
}
