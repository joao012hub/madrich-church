'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CriarConta() {
  const [nomeIgreja, setNomeIgreja] = useState('')
  const [nomeAdmin, setNomeAdmin] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  async function handleCriarConta() {
    setErro('')
    setMensagem('')
    if (!nomeIgreja.trim() || !nomeAdmin.trim() || !email.trim() || !senha) {
      setErro('Preencha todos os campos!')
      return
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!')
      return
    }
    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres!')
      return
    }
    setCarregando(true)

    const res = await fetch('/api/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomeIgreja, nomeAdmin, email, senha }),
    })

    const json = await res.json()
    if (!res.ok) {
      setErro(json.erro || 'Erro ao criar conta!')
    } else {
      setMensagem('Conta criada! Verifique seu email para confirmar e depois faça login.')
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
          <p className="text-gray-400 text-sm">Crie a conta da sua igreja gratuitamente</p>
        </div>
        <div className="rounded-2xl p-8" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)'}}>
          <h2 className="text-white font-semibold text-lg mb-6">Criar nova conta</h2>
          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wide">Nome da Igreja</label>
            <input type="text" placeholder="Ex: Igreja Batista Central" value={nomeIgreja} onChange={e => setNomeIgreja(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)'}} />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wide">Seu Nome</label>
            <input type="text" placeholder="Nome do administrador" value={nomeAdmin} onChange={e => setNomeAdmin(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)'}} />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wide">Email</label>
            <input type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)'}} />
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wide">Senha</label>
            <input type="password" placeholder="Mínimo 6 caracteres" value={senha} onChange={e => setSenha(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)'}} />
          </div>
          <div className="mb-6">
            <label className="text-gray-400 text-xs mb-2 block uppercase tracking-wide">Confirmar Senha</label>
            <input type="password" placeholder="Repita a senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} className="w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)'}} />
          </div>
          {erro && <div className="mb-4 px-4 py-3 rounded-xl text-red-400 text-sm" style={{background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)'}}>{erro}</div>}
          {mensagem && <div className="mb-4 px-4 py-3 rounded-xl text-green-400 text-sm" style={{background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)'}}>✓ {mensagem}</div>}
          <button onClick={handleCriarConta} disabled={carregando} className="w-full py-3 rounded-xl text-white font-semibold text-sm transition hover:opacity-90 mb-4" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>
            {carregando ? 'Criando conta...' : 'Criar conta grátis'}
          </button>
          <p className="text-center text-gray-400 text-sm">
            Já tem conta?{' '}
            <a href="/" className="text-indigo-400 hover:text-indigo-300 transition">Fazer login</a>
          </p>
        </div>
        <p className="text-center text-gray-600 text-xs mt-6">© 2026 EscalaFácil · Todos os direitos reservados</p>
      </div>
    </div>
  )
}