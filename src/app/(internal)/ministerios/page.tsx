'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Ministerio { id: string; nome: string }

export default function Ministerios() {
  const [ministerios, setMinisterios] = useState<Ministerio[]>([])
  const [nome, setNome] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  async function carregar() {
    const { data } = await supabase.from('ministerios').select('*').order('criado_em', { ascending: false })
    setMinisterios(data || [])
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/'
    })
    carregar()
  }, [])

  async function handleAdicionar() {
    if (!nome.trim()) return
    setCarregando(true)
    const { error } = await supabase.from('ministerios').insert({ nome })
    if (error) { setMensagem('Erro ao cadastrar!') } else {
      setMensagem('Ministério cadastrado!')
      setNome('')
      carregar()
    }
    setCarregando(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  async function handleDeletar(id: string) {
    await supabase.from('ministerios').delete().eq('id', id)
    carregar()
  }

  const icones = ['🎵','🎸','🥁','🎹','📸','📺','🎤','🙏','👶','🚗','☕']

  return (
    <div className="min-h-screen" style={{background: "radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f0f 70%)"}}>
      <nav className="px-6 py-4 flex justify-between items-center" style={{background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)"}}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)"}}>⛪</div>
          <span className="text-white font-bold">EscalaFácil</span>
        </div>
        <a href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">← Voltar ao painel</a>
      </nav>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8 mt-4">
          <h2 className="text-2xl font-bold text-white mb-1">🎵 Ministérios</h2>
          <p className="text-gray-400 text-sm">Gerencie os ministérios da sua igreja</p>
        </div>
        <div className="rounded-2xl p-6 mb-6" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
          <h3 className="text-white font-semibold mb-4">Adicionar Ministério</h3>
          <div className="flex gap-3">
            <input type="text" placeholder="Ex: Louvor, Mídia, Recepção..." value={nome} onChange={e => setNome(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdicionar()} className="flex-1 px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}} />
            <button onClick={handleAdicionar} disabled={carregando} className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)"}}>
              {carregando ? '...' : 'Adicionar'}
            </button>
          </div>
          {mensagem && <div className="mt-3 px-4 py-2 rounded-lg text-green-400 text-sm" style={{background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)"}}>✓ {mensagem}</div>}
        </div>
        <div className="rounded-2xl overflow-hidden" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
          <div className="px-6 py-4" style={{borderBottom: "1px solid rgba(255,255,255,0.08)"}}>
            <h3 className="text-white font-semibold">Ministérios Cadastrados</h3>
            <p className="text-gray-400 text-xs mt-1">{ministerios.length} ministério(s)</p>
          </div>
          {ministerios.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-4xl mb-3">🎵</p>
              <p className="text-gray-400 text-sm">Nenhum ministério cadastrado ainda</p>
            </div>
          ) : (
            ministerios.map((m, i) => (
              <div key={m.id} className="flex justify-between items-center px-6 py-4" style={{borderBottom: "1px solid rgba(255,255,255,0.05)"}}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{background: "rgba(99,102,241,0.2)"}}>
                    {icones[i % icones.length]}
                  </div>
                  <span className="text-white font-medium">{m.nome}</span>
                </div>
                <button onClick={() => handleDeletar(m.id)} className="text-xs text-red-400 hover:text-red-300 px-3 py-1 rounded-lg transition" style={{background: "rgba(239,68,68,0.1)"}}>Remover</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
