'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Escalas() {
  const [escalas, setEscalas] = useState([])
  const [cultos, setCultos] = useState([])
  const [ministerios, setMinisterios] = useState([])
  const [membros, setMembros] = useState([])
  const [cultoId, setCultoId] = useState('')
  const [ministerioId, setMinisterioId] = useState('')
  const [usuarioId, setUsuarioId] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  async function carregar() {
    const { data: e } = await supabase.from('escalas').select('*, cultos(nome, data), ministerios(nome), usuarios(nome)').order('criado_em', { ascending: false })
    const { data: c } = await supabase.from('cultos').select('*')
    const { data: m } = await supabase.from('ministerios').select('*')
    const { data: u } = await supabase.from('usuarios').select('*')
    setEscalas(e || [])
    setCultos(c || [])
    setMinisterios(m || [])
    setMembros(u || [])
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/'
    })
    carregar()
  }, [])

  async function handleAdicionar() {
    if (!cultoId || !ministerioId || !usuarioId) return
    setCarregando(true)
    const { error } = await supabase.from('escalas').insert({ culto_id: cultoId, ministerio_id: ministerioId, usuario_id: usuarioId, status: 'pendente' })
    if (error) { setMensagem('Erro ao criar escala!') } else {
      setMensagem('Membro escalado!')
      setCultoId(''); setMinisterioId(''); setUsuarioId('')
      carregar()
    }
    setCarregando(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  async function handleStatus(id, status) {
    await supabase.from('escalas').update({ status }).eq('id', id)
    carregar()
  }

  async function handleDeletar(id) {
    await supabase.from('escalas').delete().eq('id', id)
    carregar()
  }

  const statusConfig = {
    pendente: { cor: 'rgba(234,179,8,0.15)', texto: '#facc15', label: 'Pendente' },
    aprovado: { cor: 'rgba(34,197,94,0.15)', texto: '#4ade80', label: 'Aprovado' },
    recusado: { cor: 'rgba(239,68,68,0.15)', texto: '#f87171', label: 'Recusado' },
    confirmado: { cor: 'rgba(99,102,241,0.15)', texto: '#818cf8', label: 'Confirmado' },
  }

  return (
    <div className="min-h-screen" style={{background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f0f 70%)"}}>
      <nav className="px-6 py-4 flex justify-between items-center" style={{background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)"}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)"}}>⛪</div>
          <span className="text-white font-bold">EscalaFácil</span>
        </div>
        <a href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">Voltar ao painel</a>
      </nav>
      <div className="p-6 max-w-3xl mx-auto">
        <div className="mb-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-1">📋 Escalas</h2>
          <p className="text-gray-400 text-sm">Gerencie as escalas dos cultos</p>
        </div>
        <div className="rounded-2xl p-6 mb-6" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
          <h3 className="text-white font-semibold mb-4">Adicionar à Escala</h3>
          <select value={cultoId} onChange={e => setCultoId(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}}>
            <option value="">Selecione o culto</option>
            {cultos.map(c => <option key={c.id} value={c.id}>{c.nome} — {c.data}</option>)}
          </select>
          <select value={ministerioId} onChange={e => setMinisterioId(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}}>
            <option value="">Selecione o ministério</option>
            {ministerios.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
          </select>
          <select value={usuarioId} onChange={e => setUsuarioId(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}}>
            <option value="">Selecione o membro</option>
            {membros.map(u => <option key={u.id} value={u.id}>{u.nome}</option>)}
          </select>
          <button onClick={handleAdicionar} disabled={carregando} className="w-full py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)"}}>
            {carregando ? 'Salvando...' : 'Adicionar à Escala'}
          </button>
          {mensagem && <div className="mt-3 px-4 py-2 rounded-lg text-green-400 text-sm" style={{background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)"}}>✓ {mensagem}</div>}
        </div>
        <div className="rounded-2xl overflow-hidden" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
          <div className="px-6 py-4" style={{borderBottom: "1px solid rgba(255,255,255,0.08)"}}>
            <h3 className="text-white font-semibold">Escalas Geradas</h3>
            <p className="text-gray-400 text-xs mt-1">{escalas.length} escala(s)</p>
          </div>
          {escalas.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-400 text-sm">Nenhuma escala gerada ainda</p>
            </div>
          ) : (
            escalas.map(e => (
              <div key={e.id} className="px-6 py-4" style={{borderBottom: "1px solid rgba(255,255,255,0.05)"}}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)"}}>
                      {e.usuarios?.nome?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{e.usuarios?.nome}</p>
                      <p className="text-gray-400 text-xs">{e.cultos?.nome} · {e.ministerios?.nome}</p>
                    </div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{background: statusConfig[e.status]?.cor, color: statusConfig[e.status]?.texto}}>
                    {statusConfig[e.status]?.label}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => handleStatus(e.id, 'aprovado')} className="text-xs px-3 py-1 rounded-lg text-green-400 transition hover:opacity-80" style={{background: "rgba(34,197,94,0.15)"}}>✓ Aprovar</button>
                  <button onClick={() => handleStatus(e.id, 'recusado')} className="text-xs px-3 py-1 rounded-lg text-red-400 transition hover:opacity-80" style={{background: "rgba(239,68,68,0.15)"}}>✗ Recusar</button>
                  <button onClick={() => handleStatus(e.id, 'confirmado')} className="text-xs px-3 py-1 rounded-lg text-indigo-400 transition hover:opacity-80" style={{background: "rgba(99,102,241,0.15)"}}>★ Confirmar</button>
                  <button onClick={() => handleDeletar(e.id)} className="text-xs px-3 py-1 rounded-lg text-gray-400 transition hover:opacity-80 ml-auto" style={{background: "rgba(255,255,255,0.05)"}}>Remover</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
