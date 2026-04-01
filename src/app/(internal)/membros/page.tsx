'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Membros() {
  const [membros, setMembros] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tipo, setTipo] = useState('membro')
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [editando, setEditando] = useState(null)

  async function carregar() {
    const { data } = await supabase.from('usuarios').select('*').order('criado_em', { ascending: false })
    setMembros(data || [])
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/'
    })
    carregar()
  }, [])

  function abrirEdicao(m) { setEditando(m.id); setNome(m.nome); setEmail(m.email); setTipo(m.tipo) }
  function cancelarEdicao() { setEditando(null); setNome(''); setEmail(''); setTipo('membro') }

  async function handleSalvar() {
    if (!nome.trim() || !email.trim()) return
    setCarregando(true)
    if (editando) {
      await supabase.from('usuarios').update({ nome, email, tipo }).eq('id', editando)
      setMensagem('Membro atualizado!'); setEditando(null)
    } else {
      await supabase.from('usuarios').insert({ nome, email, tipo, igreja_id: null })
      setMensagem('Membro cadastrado!')
    }
    setNome(''); setEmail(''); setTipo('membro')
    carregar(); setCarregando(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  async function handleDeletar(id) {
    if (!confirm('Tem certeza?')) return
    await supabase.from('usuarios').delete().eq('id', id); carregar()
  }

  const tipoConfig = {
    admin: { cor: 'rgba(239,68,68,0.15)', texto: '#f87171', label: 'Admin' },
    lider: { cor: 'rgba(234,179,8,0.15)', texto: '#facc15', label: 'Lider' },
    membro: { cor: 'rgba(99,102,241,0.15)', texto: '#818cf8', label: 'Membro' },
  }

  const selectStyle = { background: "#1e1e2e", border: "1px solid rgba(255,255,255,0.1)", color: "white" }

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Membros</h2>
        <p className="text-gray-400 text-sm">Cadastre e gerencie os membros da sua igreja</p>
      </div>
      <div className="rounded-2xl p-6 mb-6" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
        <h3 className="text-white font-semibold mb-4">{editando ? 'Editando Membro' : 'Adicionar Membro'}</h3>
        <input type="text" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}} />
        <input type="email" placeholder="email@exemplo.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}} />
        <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" style={selectStyle}>
          <option value="membro">Membro</option>
          <option value="lider">Lider</option>
          <option value="admin">Admin</option>
        </select>
        <div className="flex gap-3">
          <button onClick={handleSalvar} disabled={carregando} className="flex-1 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)"}}>
            {carregando ? 'Salvando...' : editando ? 'Salvar alteracoes' : 'Adicionar Membro'}
          </button>
          {editando && <button onClick={cancelarEdicao} className="px-6 py-3 rounded-xl text-gray-400 text-sm" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)"}}>Cancelar</button>}
        </div>
        {mensagem && <div className="mt-3 px-4 py-2 rounded-lg text-green-400 text-sm" style={{background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)"}}>✓ {mensagem}</div>}
      </div>
      <div className="rounded-2xl overflow-hidden" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
        <div className="px-6 py-4" style={{borderBottom: "1px solid rgba(255,255,255,0.08)"}}>
          <h3 className="text-white font-semibold">Membros Cadastrados</h3>
          <p className="text-gray-400 text-xs mt-1">{membros.length} membro(s)</p>
        </div>
        {membros.length === 0 ? (
          <div className="px-6 py-12 text-center"><p className="text-4xl mb-3">👥</p><p className="text-gray-400 text-sm">Nenhum membro ainda</p></div>
        ) : membros.map(m => (
          <div key={m.id} className="flex justify-between items-center px-6 py-4" style={{borderBottom: "1px solid rgba(255,255,255,0.05)"}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)"}}>
                {m.nome.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium text-sm">{m.nome}</p>
                <p className="text-gray-400 text-xs">{m.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full font-medium" style={{background: tipoConfig[m.tipo]?.cor, color: tipoConfig[m.tipo]?.texto}}>{tipoConfig[m.tipo]?.label}</span>
              <button onClick={() => abrirEdicao(m)} className="text-xs px-3 py-1 rounded-lg text-indigo-400" style={{background: "rgba(99,102,241,0.15)"}}>Editar</button>
              <button onClick={() => handleDeletar(m.id)} className="text-xs px-3 py-1 rounded-lg text-red-400" style={{background: "rgba(239,68,68,0.1)"}}>Remover</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
