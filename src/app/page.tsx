'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [carregando, setCarregando] = useState(false)

  async function handleLogin() {
    setCarregando(true)
    setMensagem('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha })
    if (error) {
      setMensagem('Email ou senha incorretos!')
      setCarregando(false)
      return
    }
    const { data: usuario } = await supabase.from('usuarios').select('tipo').eq('email', email).single()
    if (usuario?.tipo === 'lider') {
      window.location.href = '/lider'
    } else if (usuario?.tipo === 'membro') {
      window.location.href = '/membro'
    } else {
      window.location.href = '/dashboard'
    }
    setCarregando(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #0f0f0f 70%)'}}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
            <span className="text-2xl">⛪</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">EscalaFácil</h1>
          <p className="text-gray-400 text-sm">Sistema de Escalas para Igrejas</p>
        </div>
        <div className="rounded-2xl p-8" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
          <h2 className="text-white font-semibold text-lg mb-6">Entrar na sua conta</h2>
          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wide">Email</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)'}} />
          </div>
          <div className="mb-6">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wide">Senha</label>
            <input type="password" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)'}} />
          </div>
          <button onClick={handleLogin} disabled={carregando} className="w-full py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 mb-4" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
          {mensagem && <div className="mb-4 px-4 py-3 rounded-xl text-red-400 text-sm text-center" style={{background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)'}}>{mensagem}</div>}
          <p className="text-center text-gray-400 text-sm">
            Nao tem conta?{' '}
            <a href="/criar-conta" className="text-indigo-400 hover:text-indigo-300 transition">Criar conta gratis</a>
          </p>
        </div>
        <p className="text-center text-gray-600 text-xs mt-6">2026 EscalaFacil - Todos os direitos reservados</p>
      </div>
    </div>
  )
}
