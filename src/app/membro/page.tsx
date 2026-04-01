'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardMembro() {
  const [usuario, setUsuario] = useState(null)
  const [escalas, setEscalas] = useState([])
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    async function carregar() {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) { window.location.href = '/'; return }
      const { data: u } = await supabase.from('usuarios').select('*').eq('email', auth.user.email).single()
      if (!u) { window.location.href = '/'; return }
      if (u.tipo === 'admin') { window.location.href = '/dashboard'; return }
      if (u.tipo === 'lider') { window.location.href = '/lider'; return }
      setUsuario(u)
      const { data: e } = await supabase.from('escalas').select('*, cultos(nome, data, horario), ministerios(nome)').eq('usuario_id', u.id).order('criado_em', { ascending: false })
      setEscalas(e || [])
    }
    carregar()
  }, [])

  async function handleConfirmar(id, status) {
    await supabase.from('escalas').update({ status }).eq('id', id)
    const { data: auth } = await supabase.auth.getUser()
    const { data: u } = await supabase.from('usuarios').select('*').eq('email', auth.user.email).single()
    const { data: e } = await supabase.from('escalas').select('*, cultos(nome, data, horario), ministerios(nome)').eq('usuario_id', u.id).order('criado_em', { ascending: false })
    setEscalas(e || [])
    setMensagem(status === 'confirmado' ? 'Presenca confirmada!' : 'Recusado!')
    setTimeout(() => setMensagem(''), 3000)
  }

  async function handleSair() { await supabase.auth.signOut(); window.location.href = '/' }

  function formatarData(d) { if (!d) return ''; const [a,m,dia]=d.split('-'); return dia+'/'+m+'/'+a }

  const sc = {
    pendente: { cor: 'rgba(234,179,8,0.15)', texto: '#facc15', label: 'Aguardando' },
    aprovado: { cor: 'rgba(34,197,94,0.15)', texto: '#4ade80', label: 'Aprovado' },
    confirmado: { cor: 'rgba(99,102,241,0.15)', texto: '#818cf8', label: 'Confirmado' },
    recusado: { cor: 'rgba(239,68,68,0.15)', texto: '#f87171', label: 'Recusado' }
  }

  return (
    <div className="min-h-screen" style={{background:"radial-gradient(ellipse at top,#1e1b4b 0%,#0f0f0f 70%)"}}>
      <nav className="px-6 py-4 flex justify-between items-center" style={{background:"rgba(255,255,255,0.03)",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}}>⛪</div>
          <span className="text-white font-bold text-sm">EscalaFacil</span>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{background:"rgba(99,102,241,0.15)",color:"#818cf8"}}>Membro</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{usuario?.nome}</span>
          <button onClick={handleSair} className="text-sm px-4 py-2 rounded-lg text-white" style={{background:"rgba(239,68,68,0.2)",border:"1px solid rgba(239,68,68,0.3)"}}>Sair</button>
        </div>
      </nav>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-1">Minhas Escalas</h2>
          <p className="text-gray-400 text-sm">Confirme sua presenca nos cultos</p>
        </div>
        {mensagem && <div className="mb-4 px-4 py-3 rounded-xl text-green-400 text-sm" style={{background:"rgba(34,197,94,0.1)",border:"1px solid rgba(34,197,94,0.2)"}}>✓ {mensagem}</div>}
        <div className="rounded-2xl overflow-hidden" style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)"}}>
          <div className="px-6 py-4" style={{borderBottom:"1px solid rgba(255,255,255,0.08)"}}>
            <h3 className="text-white font-semibold">Minhas Escalas</h3>
            <p className="text-gray-400 text-xs mt-1">{escalas.length} escala(s)</p>
          </div>
          {escalas.length === 0 ? (
            <div className="px-6 py-12 text-center"><p className="text-4xl mb-3">🙏</p><p className="text-gray-400 text-sm">Voce ainda nao foi escalado</p></div>
          ) : escalas.map(e => (
            <div key={e.id} className="px-6 py-5" style={{borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-white font-semibold">{e.cultos?.nome}</p>
                  <p className="text-gray-400 text-sm mt-1">{formatarData(e.cultos?.data)} as {e.cultos?.horario?.slice(0,5)}</p>
                  <p className="text-indigo-400 text-xs mt-1">{e.ministerios?.nome}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-medium" style={{background:sc[e.status]?.cor,color:sc[e.status]?.texto}}>{sc[e.status]?.label}</span>
              </div>
              {(e.status === 'pendente' || e.status === 'aprovado') && (
                <div className="flex gap-3">
                  <button onClick={() => handleConfirmar(e.id, 'confirmado')} className="flex-1 py-2 rounded-xl text-white font-semibold text-sm hover:opacity-90" style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)"}}>Confirmar Presenca</button>
                  <button onClick={() => handleConfirmar(e.id, 'recusado')} className="px-4 py-2 rounded-xl text-red-400 text-sm" style={{background:"rgba(239,68,68,0.15)"}}>Nao posso</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
