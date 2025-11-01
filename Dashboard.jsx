import { useEffect, useState } from 'react'

export default function Dashboard(){
  const [list, setList] = useState([])
  useEffect(()=>{
    fetch('/api/admin/consultations').then(r=>r.json()).then(setList)
  },[])
  return (
    <div>
      <h2 className="text-xl font-semibold">الاستشارات الواردة</h2>
      <ul>
        {list.map(c=> (
          <li key={c.id} className="border p-3 my-2 rounded">
            <div><strong>{c.name||'---'}</strong> - {c.contact}</div>
            <div className="text-sm">{new Date(c.created_at).toLocaleString()}</div>
            <pre className="mt-2 text-xs bg-gray-50 p-2">{c.messages}</pre>
          </li>
        ))}
      </ul>
    </div>
  )
}
