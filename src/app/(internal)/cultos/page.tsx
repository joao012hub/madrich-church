'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Culto {
  id: string
  nome: string
  data: string
  horario: string
  recorrencia: string
}

type RecorrenciaKey = 'unico' | 'semanal' | 'quinzenal' | 'mensal'

export default function Cultos() {
  const [cultos, setCultos] = useState<Culto[]>([])
  const [nome, setNome] = useState('')
  const [data, setData] = useState('')
  const [horario, setHorario] = useState('')
  const [recorrencia, setRecorrencia] = useState<RecorrenciaKey>('unico')
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [editando, setEditando] = useState<Culto | null>(null)

  async function carregar() {
    const { data: c } = await supabase.from('cultos').select('*').order('data', { ascending: true })
    setCultos(c || [])
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/'
    })
    carregar()
  }, [])

  function abrirEdicao(c: Culto) {
    setEditando(c)
    setNome(c.nome)
    setData(c.data)
    setHorario(c.horario?.slice(0, 5))
    setRecorrencia(c.recorrencia as RecorrenciaKey)
  }

  function cancelarEdicao() {
    setEditando(null)
    setNome(''); setData(''); setHorario(''); setRecorrencia('unico')
  }

  async function handleSalvar() {
    if (!nome.trim() || !data || !horario) return
    setCarregando(true)
    if (editando) {
      await supabase.from('cultos').update({ nome, data, horario, recorrencia }).eq('id', editando.id)
      setMensagem('Culto atualizado!')
      setEditando(null)
    } else {
      await supabase.from('cultos').insert({ nome, data, horario, recorrencia })
      setMensagem('Culto cadastrado!')
    }
    setNome(''); setData(''); setHorario(''); setRecorrencia('unico')
    carregar()
    setCarregando(false)
    setTimeout(() => setMensagem(''), 3000)
  }

  async function handleDeletar(id: string) {
    if (!confirm('Tem certeza que deseja remover este culto?')) return
    await supabase.from('cultos').delete().eq('id', id)
    carregar()
  }

  async function handleDuplicar(c: Culto) {
    await supabase.from('cultos').insert({ nome: c.nome + ' (cópia)', data: c.data, horario: c.horario, recorrencia: c.recorrencia })
    setMensagem('Culto duplicado!')
    carregar()
    setTimeout(() => setMensagem(''), 3000)
  }

  function formatarData(dataStr: string) {
    const [ano, mes, dia] = dataStr.split('-')
    return dia + '/' + mes + '/' + ano
  }

  const recorrenciaConfig: Record<RecorrenciaKey, { label: string; cor: string; texto: string }> = {
    unico: { label: 'Único', cor: 'rgba(99,102,241,0.15)', texto: '#818cf8' },
    semanal: { label: 'Semanal', cor: 'rgba(34,197,94,0.15)', texto: '#4ade80' },
    quinzenal: { label: 'Quinzenal', cor: 'rgba(234,179,8,0.15)', texto: '#facc15' },
    mensal: { label: 'Mensal', cor: 'rgba(239,68,68,0.15)', texto: '#f87171' },
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">📅 Cultos</h2>
        <p className="text-gray-400 text-sm">Cadastre e gerencie os cultos da sua igreja</p>
      </div>

      <div className="rounded-2xl p-6 mb-6" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
        <h3 className="text-white font-semibold mb-4">{editando ? '✏️ Editando Culto' : 'Adicionar Culto'}</h3>
        <input type="text" placeholder="Nome do culto" value={nome} onChange={e => setNome(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}} />
        <div className="flex gap-3 mb-3">
          <input type="date" value={data} onChange={e => setData(e.target.value)} className="flex-1 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}} />
          <input type="time" value={horario} onChange={e => setHorario(e.target.value)} className="flex-1 px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}} />
        </div>
        <select value={recorrencia} onChange={e => setRecorrencia(e.target.value as RecorrenciaKey)} className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4" style={{background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)"}}>
          <option value="unico">Único</option>
          <option value="semanal">Semanal</option>
          <option value="quinzenal">Quinzenal</option>
          <option value="mensal">Mensal</option>
        </select>
        <div className="flex gap-3">
          <button onClick={handleSalvar} disabled={carregando} className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)"}}>
            {carregando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Adicionar Culto'}
          </button>
          {editando && <button onClick={cancelarEdicao} className="px-6 py-3 rounded-xl text-gray-400 text-sm" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)"}}>Cancelar</button>}
        </div>
        {mensagem && <div className="mt-3 px-4 py-2 rounded-lg text-green-400 text-sm" style={{background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)"}}>✓ {mensagem}</div>}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
        <div className="px-6 py-4" style={{borderBottom: "1px solid rgba(255,255,255,0.08)"}}>
          <h3 className="text-white font-semibold">Cultos Cadastrados</h3>
          <p className="text-gray-400 text-xs mt-1">{cultos.length} culto(s)</p>
        </div>
        {cultos.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-gray-400 text-sm">Nenhum culto cadastrado ainda</p>
          </div>
        ) : (
          cultos.map(c => (
            <div key={c.id} className="flex justify-between items-center px-6 py-4" style={{borderBottom: "1px solid rgba(255,255,255,0.05)"}}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{background: "rgba(99,102,241,0.2)"}}>📅</div>
                <div>
                  <p className="text-white font-medium text-sm">{c.nome}</p>
                  <p className="text-gray-400 text-xs">{formatarData(c.data)} às {c.horario?.slice(0,5)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full" style={{background: recorrenciaConfig[c.recorrencia as RecorrenciaKey]?.cor, color: recorrenciaConfig[c.recorrencia as RecorrenciaKey]?.texto}}>{recorrenciaConfig[c.recorrencia as RecorrenciaKey]?.label}</span>
                <button onClick={() => abrirEdicao(c)} className="text-xs px-3 py-1 rounded-lg text-indigo-400" style={{background: "rgba(99,102,241,0.15)"}}>Editar</button>
                <button onClick={() => handleDuplicar(c)} className="text-xs px-3 py-1 rounded-lg text-cyan-400" style={{background: "rgba(6,182,212,0.15)"}}>Duplicar</button>
                <button onClick={() => handleDeletar(c.id)} className="text-xs px-3 py-1 rounded-lg text-red-400" style={{background: "rgba(239,68,68,0.1)"}}>Remover</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
