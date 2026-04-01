'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Usuario {
  id: string
  email?: string
}

interface Culto {
  id: string
  nome: string
  data: string
  horario: string
  recorrencia: string
}

interface Stats {
  membros: number
  ministerios: number
  cultos: number
  escalas: number
  pendentes: number
}

export default function Dashboard() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)
  const [stats, setStats] = useState<Stats>({ membros: 0, ministerios: 0, cultos: 0, escalas: 0, pendentes: 0 })
  const [proximosCultos, setProximosCultos] = useState<Culto[]>([])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = '/'
      setUsuario(data.user)
    })
    async function carregarStats() {
      const [{ count: membros }, { count: ministerios }, { count: cultos }, { count: escalas }, { count: pendentes }] = await Promise.all([
        supabase.from('usuarios').select('*', { count: 'exact', head: true }),
        supabase.from('ministerios').select('*', { count: 'exact', head: true }),
        supabase.from('cultos').select('*', { count: 'exact', head: true }),
        supabase.from('escalas').select('*', { count: 'exact', head: true }),
        supabase.from('escalas').select('*', { count: 'exact', head: true }).eq('status', 'pendente'),
      ])
      setStats({ membros: membros || 0, ministerios: ministerios || 0, cultos: cultos || 0, escalas: escalas || 0, pendentes: pendentes || 0 })
      const { data: proximos } = await supabase.from('cultos').select('*').gte('data', new Date().toISOString().split('T')[0]).order('data').limit(3)
      setProximosCultos(proximos || [])
    }
    carregarStats()
  }, [])

  const widgets = [
    { label: 'Membros', valor: stats.membros, icon: '👥', cor: 'from-violet-500 to-purple-600', href: '/membros' },
    { label: 'Ministérios', valor: stats.ministerios, icon: '🎵', cor: 'from-indigo-500 to-blue-600', href: '/ministerios' },
    { label: 'Cultos', valor: stats.cultos, icon: '📅', cor: 'from-blue-500 to-cyan-600', href: '/cultos' },
    { label: 'Escalas Pendentes', valor: stats.pendentes, icon: '⏳', cor: 'from-amber-500 to-orange-600', href: '/escalas' },
  ]

  function formatarData(dataStr: string) {
    const [ano, mes, dia] = dataStr.split('-')
    return dia + '/' + mes + '/' + ano
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-1">Painel Principal</h2>
        <p className="text-gray-400 text-sm">Visão geral da sua igreja</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {widgets.map(w => (
          <a key={w.label} href={w.href} className="rounded-2xl p-5 transition hover:scale-105 cursor-pointer" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
            <div className={"w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 bg-gradient-to-br " + w.cor}>
              {w.icon}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{w.valor}</p>
            <p className="text-gray-400 text-xs">{w.label}</p>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl p-6" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
          <h3 className="text-white font-semibold mb-4">📅 Próximos Cultos</h3>
          {proximosCultos.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum culto agendado</p>
          ) : (
            proximosCultos.map(c => (
              <div key={c.id} className="flex justify-between items-center py-3" style={{borderBottom: "1px solid rgba(255,255,255,0.05)"}}>
                <div>
                  <p className="text-white text-sm font-medium">{c.nome}</p>
                  <p className="text-gray-400 text-xs">{formatarData(c.data)} às {c.horario?.slice(0,5)}</p>
                </div>
                <span className="text-xs px-2 py-1 rounded-full" style={{background: "rgba(99,102,241,0.2)", color: "#a5b4fc"}}>{c.recorrencia}</span>
              </div>
            ))
          )}
          <a href="/cultos" className="mt-4 block text-center text-xs text-indigo-400 hover:text-indigo-300">Ver todos os cultos →</a>
        </div>

        <div className="rounded-2xl p-6" style={{background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)"}}>
          <h3 className="text-white font-semibold mb-4">⚡ Ações Rápidas</h3>
          <div className="flex flex-col gap-3">
            <a href="/cultos" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white transition hover:opacity-80" style={{background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)"}}>
              <span>📅</span> Criar novo culto
            </a>
            <a href="/escalas" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white transition hover:opacity-80" style={{background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)"}}>
              <span>📋</span> Criar nova escala
            </a>
            <a href="/membros" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white transition hover:opacity-80" style={{background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)"}}>
              <span>👥</span> Adicionar membro
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}