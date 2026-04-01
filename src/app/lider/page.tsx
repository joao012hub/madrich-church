'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardLider() {
  const [usuario, setUsuario] = useState(null)
  const [escalas, setEscalas] = useState([])
  const [stats, setStats] = useState({ pendentes: 0, aprovadas: 0, total: 0 })

  useEffect(() => {
    async function carregar() {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) { window.location.href = '/'; return }
      const { data: u } = await supabase.from('usuarios').select('*').eq('email', auth.user.email).single()
      if (!u || u.tipo === 'admin') { window.location.href = '/dashboard'; return }
      setUsuario(u)
      const { data: e } = await supabase.from('escalas').select('*, cultos(nome, data), ministerios(nome), usuarios(nome)').order('criado_em', { ascending: false })
      setEscalas(e || [])
      setStats({ pendentes: (e||[]).filter(x=>x.status==='pendente').length, aprovadas: (e||[]).filter(x=>x.status==='aprovado').length, total: (e||[]).length })
    }
    carregar()
  }, [])

  async function handleStatus(id, status) {
    await supabase.from('escalas').update({ status }).eq('id', id)
    const { data: e } = await supabase.from('escalas').select('*, cultos(nome, data), ministerios(nome), usuarios(nome)').order('criado_em', { ascending: false })
    setEscalas(e || [])
    setStats({ pendentes: (e||[]).filter(x=>x.status==='pendente').length, aprovadas: (e||[]).filter(x=>x.status==='aprovado').length, total: (e||[]).length })
  }

  async function handleSair() { await supabase.auth.signOut(); window.location.href = '/' }

  const sc = { pendente: { cor: 'rgba(234,179,8,0.15)', texto: '#facc15', label: 'Pendente' }, aprovado: { cor: 'rgba(34,197,94,0.15)', texto: '#4ade80', label: 'Aprovado' }, recusado: { cor: 'rgba(239,68,68,0.15)', texto: '#f87171', label: 'Recusado' }, confirmado: { cor: 'rgba(99,102,241,0.15)', texto: '#818cf8', label: 'Confirmado' } }

  return (
    <div className="min-h-screen" style={{background:"radial-gradient(ellipse at top,#1e1b4b 0%,#0f0f0f 70%)"}}>
      <nav className="px-6 py-4 flex justify-between items-center" style={{background:"rgba(255,255,255,0.03)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}}>⛪</div>
          <span className="text-white font-bold text-sm">EscalaFacil</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{background:"rgba(234,179,8,0.15)",color:"#facc15"}}>Lider</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{usuario?.nome}</span>
          <button onClick={handleSair} className="text-sm px-4 py-2 rounded-lg text-white" style={{background:"rgba(239,68,68,0.2)",border:"1px solid rgba(239,68,68,0.3)"}}>Sair</button>
        </div>
      </nav>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-1">Area do Lider</h2>
          <p className="text-gray-400 text-sm">Gerencie e aprove as escalas</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[{label:'Total',valor:stats.total,icon:'📋',cor:'from-indigo-500 to-blue-600'},{label:'Pendentes',valor:stats.pendentes,icon:'⏳',cor:'from-amber-500 to-orange-600'},{label:'Aprovadas',valor:stats.aprovadas,icon:'✅',cor:'from-green-500 to-emerald-600'}].map(w=>(
            <div key={w.label} className="rounded-2xl p-5" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}>
              <div className={"w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 bg-gradient-to-br "+w.cor}>{w.icon}</div>
              <p className="text-3xl font-bold text-white mb-1">{w.valor}</p>
              <p className="text-gray-400 text-xs">{w.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl overflow-hidden" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}>
          <div className="px-6 py-4" style={{borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
            <h3 className="text-white font-semibold">Escalas</h3>
          </div>
          {escalas.length===0?(<div className="px-6 py-12 text-center"><p className="text-4xl mb-3">📋</p><p className="text-gray-400 text-sm">Nenhuma escala ainda</p></div>):escalas.map(e=>(
            <div key={e.id} className="px-6 py-4" style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}}>{e.usuarios?.nome?.charAt(0).toUpperCase()}</div>
                  <div>
                    <p className="text-white font-medium text-sm">{e.usuarios?.nome}</p>
                    <p className="text-gray-400 text-xs">{e.cultos?.nome} · {e.ministerios?.nome}</p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-medium" style={{background:sc[e.status]?.cor,color:sc[e.status]?.texto}}>{sc[e.status]?.label}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>handleStatus(e.id,'aprovado')} className="text-xs px-3 py-1 rounded-lg text-green-400" style={{background:"rgba(34,197,94,0.15)"}}>Aprovar</button>
                <button onClick={()=>handleStatus(e.id,'recusado')} className="text-xs px-3 py-1 rounded-lg text-red-400" style={{background:"rgba(239,68,68,0.15)"}}>Recusar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
