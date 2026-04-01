'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Sidebar() {
  const pathname = usePathname()
  const [recolhido, setRecolhido] = useState(false)

  async function handleSair() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const links = [
    { href: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { href: '/membros', icon: '👥', label: 'Membros' },
    { href: '/ministerios', icon: '🎵', label: 'Ministérios' },
    { href: '/cultos', icon: '📅', label: 'Cultos' },
    { href: '/escalas', icon: '📋', label: 'Escalas' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col z-50 transition-all duration-300" style={{width: recolhido ? '72px' : '220px', background: 'rgba(15,15,15,0.95)', borderRight: '1px solid rgba(255,255,255,0.08)'}}>
      <div className="flex items-center gap-3 px-4 py-5" style={{borderBottom: '1px solid rgba(255,255,255,0.08)'}}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, #6366f1, #8b5cf6)'}}>⛪</div>
        {!recolhido && <span className="text-white font-bold text-sm">EscalaFácil</span>}
        <button onClick={() => setRecolhido(!recolhido)} className="ml-auto text-gray-500 hover:text-white transition text-xs">
          {recolhido ? '→' : '←'}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(link => (
          <a key={link.href} href={link.href} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm" style={{
            background: pathname === link.href ? 'rgba(99,102,241,0.2)' : 'transparent',
            color: pathname === link.href ? '#a5b4fc' : '#9ca3af',
            border: pathname === link.href ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent'
          }}>
            <span className="text-base flex-shrink-0">{link.icon}</span>
            {!recolhido && <span>{link.label}</span>}
          </a>
        ))}
      </nav>

      <div className="px-3 py-4" style={{borderTop: '1px solid rgba(255,255,255,0.08)'}}>
        <button onClick={handleSair} className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all text-sm text-red-400 hover:text-red-300" style={{background: 'rgba(239,68,68,0.1)'}}>
          <span className="text-base flex-shrink-0">🚪</span>
          {!recolhido && <span>Sair</span>}
        </button>
      </div>
    </aside>
  )
}
