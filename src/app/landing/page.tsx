export default function LandingPage() {
  return (
    <div style={{fontFamily: "'Inter', system-ui, sans-serif", margin: 0, padding: 0}}>

      {/* NAVBAR */}
      <nav style={{position: "fixed", top: 0, width: "100%", zIndex: 50, padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(8,8,18,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", boxSizing: "border-box"}}>
        <div style={{display: "flex", alignItems: "center", gap: 10}}>
          <div style={{width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18}}>⛪</div>
          <span style={{color: "white", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px"}}>Madrich Church</span>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 32}}>
          <a href="#como-funciona" style={{color: "#9ca3af", textDecoration: "none", fontSize: 14, fontWeight: 500}}>Como funciona</a>
          <a href="#funcionalidades" style={{color: "#9ca3af", textDecoration: "none", fontSize: 14, fontWeight: 500}}>Funcionalidades</a>
          <a href="#planos" style={{color: "#9ca3af", textDecoration: "none", fontSize: 14, fontWeight: 500}}>Planos</a>
          <a href="/" style={{color: "#9ca3af", textDecoration: "none", fontSize: 14, fontWeight: 500}}>Login</a>
          <a href="/criar-conta" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: "none"}}>Começar grátis</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 40px 80px", background: "radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #080812 60%)", textAlign: "center", boxSizing: "border-box"}}>
        <div style={{maxWidth: 800}}>
          <div style={{display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 50, background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontSize: 13, fontWeight: 600, marginBottom: 32}}>
            ✨ A plataforma de escalas para igrejas
          </div>
          <h1 style={{fontSize: 68, fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 24, letterSpacing: "-2px"}}>
            Chega de<br />
            <span style={{background: "linear-gradient(135deg, #818cf8, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>planilha e WhatsApp</span>
          </h1>
          <p style={{fontSize: 20, color: "#9ca3af", marginBottom: 48, lineHeight: 1.7, maxWidth: 580, margin: "0 auto 48px"}}>
            O Madrich Church organiza ministérios, cultos e escalas da sua igreja em minutos. Membros confirmam presença, líderes aprovam e tudo fica registrado.
          </p>
          <div style={{display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap"}}>
            <a href="/criar-conta" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 800, textDecoration: "none", display: "inline-block"}}>
              Criar conta grátis →
            </a>
            <a href="#como-funciona" style={{background: "rgba(255,255,255,0.07)", color: "white", padding: "16px 36px", borderRadius: 14, fontSize: 16, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", display: "inline-block"}}>
              Ver como funciona
            </a>
          </div>
          <p style={{color: "#4b5563", fontSize: 13, marginTop: 20}}>✓ Sem cartão de crédito &nbsp;·&nbsp; ✓ Configuração em 5 minutos &nbsp;·&nbsp; ✓ Cancele quando quiser</p>

          {/* MOCKUP */}
          <div style={{marginTop: 64, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: 32, backdropFilter: "blur(10px)"}}>
            <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16}}>
              {[{n:"124", l:"Membros", i:"👥", c:"#6366f1"},{n:"8", l:"Ministérios", i:"🎵", c:"#8b5cf6"},{n:"52", l:"Cultos", i:"📅", c:"#06b6d4"},{n:"3", l:"Pendentes", i:"⏳", c:"#f59e0b"}].map(w=>(
                <div key={w.l} style={{background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 20, border: "1px solid rgba(255,255,255,0.06)"}}>
                  <div style={{width: 44, height: 44, borderRadius: 12, background: w.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 12}}>{w.i}</div>
                  <div style={{fontSize: 28, fontWeight: 800, color: "white"}}>{w.n}</div>
                  <div style={{fontSize: 12, color: "#6b7280"}}>{w.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section style={{padding: "80px 40px", background: "#ffffff", textAlign: "center"}}>
        <div style={{maxWidth: 900, margin: "0 auto"}}>
          <h2 style={{fontSize: 38, fontWeight: 800, color: "#0f0f1a", marginBottom: 16, letterSpacing: "-1px"}}>Você ainda gerencia escalas assim?</h2>
          <p style={{color: "#6b7280", fontSize: 18, marginBottom: 48}}>Se a resposta for sim, o Madrich Church é para você</p>
          <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24}}>
            {[
              {icon: "📊", titulo: "Planilha do Excel", desc: "Horas perdidas atualizando, versões desatualizadas e ninguém sabe qual é a certa."},
              {icon: "💬", titulo: "Grupo de WhatsApp", desc: "Mensagens perdidas, confirmações esquecidas e o líder precisa ficar cobrando todo mundo."},
              {icon: "📝", titulo: "Papel e caneta", desc: "Escalas rasuradas, membros que não viram e substituições de última hora que viram caos."},
            ].map(p=>(
              <div key={p.titulo} style={{padding: 28, borderRadius: 20, background: "#fff5f5", border: "2px solid #fee2e2", textAlign: "left"}}>
                <div style={{fontSize: 36, marginBottom: 12}}>{p.icon}</div>
                <h3 style={{fontWeight: 700, fontSize: 18, color: "#0f0f1a", marginBottom: 8}}>{p.titulo}</h3>
                <p style={{color: "#6b7280", fontSize: 14, lineHeight: 1.6}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{padding: "80px 40px", background: "#f8f9ff"}}>
        <div style={{maxWidth: 900, margin: "0 auto", textAlign: "center"}}>
          <h2 style={{fontSize: 38, fontWeight: 800, color: "#0f0f1a", marginBottom: 16, letterSpacing: "-1px"}}>Como funciona</h2>
          <p style={{color: "#6b7280", fontSize: 18, marginBottom: 56}}>Da criação da conta às escalas publicadas em minutos</p>
          <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24}}>
            {[
              {num:"1", titulo:"Crie sua conta", desc:"Cadastre a igreja em 2 minutos. Sem burocracia."},
              {num:"2", titulo:"Adicione membros", desc:"Cadastre os membros por ministério."},
              {num:"3", titulo:"Monte os cultos", desc:"Configure cultos com recorrência automática."},
              {num:"4", titulo:"Publique a escala", desc:"Membros recebem aviso e confirmam presença."},
            ].map(p=>(
              <div key={p.num} style={{textAlign: "center"}}>
                <div style={{width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "white", margin: "0 auto 16px"}}>{p.num}</div>
                <h3 style={{fontWeight: 700, fontSize: 16, color: "#0f0f1a", marginBottom: 8}}>{p.titulo}</h3>
                <p style={{color: "#6b7280", fontSize: 14, lineHeight: 1.6}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNCIONALIDADES */}
      <section id="funcionalidades" style={{padding: "80px 40px", background: "white"}}>
        <div style={{maxWidth: 960, margin: "0 auto"}}>
          <div style={{textAlign: "center", marginBottom: 56}}>
            <h2 style={{fontSize: 38, fontWeight: 800, color: "#0f0f1a", marginBottom: 16, letterSpacing: "-1px"}}>Tudo que sua igreja precisa</h2>
            <p style={{color: "#6b7280", fontSize: 18}}>Uma plataforma completa para gestão de escalas</p>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20}}>
            {[
              {icon:"🎵", titulo:"Ministérios", desc:"Organize Louvor, Mídia, Recepção, Infantil e muito mais."},
              {icon:"📅", titulo:"Cultos recorrentes", desc:"Semanal, quinzenal ou mensal. Configure uma vez e pronto."},
              {icon:"📋", titulo:"Escalas automáticas", desc:"O sistema distribui os membros de forma inteligente e equilibrada."},
              {icon:"✅", titulo:"Aprovação de líderes", desc:"Líderes aprovam ou ajustam a escala antes de publicar."},
              {icon:"🔔", titulo:"Notificações", desc:"Membros recebem aviso por email e WhatsApp quando escalados."},
              {icon:"📊", titulo:"Relatórios", desc:"Veja quem mais serviu, faltas e participação por ministério."},
            ].map(f=>(
              <div key={f.titulo} style={{padding: 24, borderRadius: 20, border: "1px solid #e8eaf6", background: "#f8f9ff"}}>
                <div style={{fontSize: 36, marginBottom: 12}}>{f.icon}</div>
                <h3 style={{fontWeight: 700, fontSize: 16, color: "#0f0f1a", marginBottom: 8}}>{f.titulo}</h3>
                <p style={{color: "#6b7280", fontSize: 14, lineHeight: 1.6}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" style={{padding: "80px 40px", background: "#f8f9ff"}}>
        <div style={{maxWidth: 800, margin: "0 auto"}}>
          <div style={{textAlign: "center", marginBottom: 56}}>
            <h2 style={{fontSize: 38, fontWeight: 800, color: "#0f0f1a", marginBottom: 16, letterSpacing: "-1px"}}>Planos simples e acessíveis</h2>
            <p style={{color: "#6b7280", fontSize: 18}}>Sem taxa de setup · Cancele quando quiser</p>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24}}>
            <div style={{background: "white", borderRadius: 24, padding: 36, border: "2px solid #e8eaf6"}}>
              <p style={{color: "#6366f1", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8}}>Starter</p>
              <div style={{display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8}}>
                <span style={{fontSize: 52, fontWeight: 900, color: "#0f0f1a", lineHeight: 1}}>R$19</span>
                <span style={{fontSize: 24, fontWeight: 700, color: "#0f0f1a", marginBottom: 4}}>,90</span>
                <span style={{color: "#9ca3af", marginBottom: 6}}>/mês</span>
              </div>
              <p style={{color: "#9ca3af", fontSize: 13, marginBottom: 28}}>Perfeito para igrejas pequenas</p>
              <ul style={{listStyle: "none", padding: 0, marginBottom: 32}}>
                {["Até 50 membros","3 ministérios","Escalas manuais","Notificações por email","Suporte por email"].map(i=>(
                  <li key={i} style={{display: "flex", alignItems: "center", gap: 10, color: "#374151", fontSize: 14, marginBottom: 10}}>
                    <span style={{color: "#6366f1", fontWeight: 700}}>✓</span> {i}
                  </li>
                ))}
              </ul>
              <a href="/criar-conta" style={{display: "block", textAlign: "center", padding: "14px", borderRadius: 12, border: "2px solid #6366f1", color: "#6366f1", fontWeight: 700, fontSize: 14, textDecoration: "none"}}>Começar agora</a>
            </div>
            <div style={{background: "linear-gradient(135deg, #6366f1, #7c3aed)", borderRadius: 24, padding: 36, position: "relative"}}>
              <div style={{position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20}}>MAIS POPULAR</div>
              <p style={{color: "#c4b5fd", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8}}>Pro</p>
              <div style={{display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8}}>
                <span style={{fontSize: 52, fontWeight: 900, color: "white", lineHeight: 1}}>R$39</span>
                <span style={{fontSize: 24, fontWeight: 700, color: "white", marginBottom: 4}}>,90</span>
                <span style={{color: "#c4b5fd", marginBottom: 6}}>/mês</span>
              </div>
              <p style={{color: "#c4b5fd", fontSize: 13, marginBottom: 28}}>Para igrejas que querem crescer</p>
              <ul style={{listStyle: "none", padding: 0, marginBottom: 32}}>
                {["Membros ilimitados","Ministérios ilimitados","Escalas automáticas","WhatsApp automático","Relatórios completos","Suporte prioritário"].map(i=>(
                  <li key={i} style={{display: "flex", alignItems: "center", gap: 10, color: "#e0e7ff", fontSize: 14, marginBottom: 10}}>
                    <span style={{color: "white", fontWeight: 700}}>✓</span> {i}
                  </li>
                ))}
              </ul>
              <a href="/criar-conta" style={{display: "block", textAlign: "center", padding: "14px", borderRadius: 12, background: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700, fontSize: 14, textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)"}}>Começar agora</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{padding: "80px 40px", background: "radial-gradient(ellipse at center, #1e1b4b 0%, #080812 70%)", textAlign: "center"}}>
        <div style={{maxWidth: 600, margin: "0 auto"}}>
          <h2 style={{fontSize: 42, fontWeight: 900, color: "white", marginBottom: 16, letterSpacing: "-1px"}}>Comece hoje mesmo</h2>
          <p style={{color: "#9ca3af", fontSize: 18, marginBottom: 40, lineHeight: 1.7}}>Junte-se a centenas de igrejas que já organizaram suas escalas com o Madrich Church</p>
          <a href="/criar-conta" style={{background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", padding: "18px 48px", borderRadius: 14, fontSize: 18, fontWeight: 800, textDecoration: "none", display: "inline-block"}}>
            Criar conta grátis →
          </a>
          <p style={{color: "#4b5563", fontSize: 13, marginTop: 16}}>✓ Grátis para começar &nbsp;·&nbsp; ✓ Sem cartão de crédito</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{padding: "32px 40px", background: "#050510", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <div style={{display: "flex", alignItems: "center", gap: 8}}>
          <div style={{width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14}}>⛪</div>
          <span style={{color: "#6b7280", fontSize: 13, fontWeight: 600}}>Madrich Church</span>
        </div>
        <p style={{color: "#374151", fontSize: 12}}>© 2026 Madrich Church · Todos os direitos reservados</p>
        <div style={{display: "flex", gap: 24}}>
          <a href="#" style={{color: "#4b5563", fontSize: 12, textDecoration: "none"}}>Privacidade</a>
          <a href="#" style={{color: "#4b5563", fontSize: 12, textDecoration: "none"}}>Termos</a>
          <a href="#" style={{color: "#4b5563", fontSize: 12, textDecoration: "none"}}>Contato</a>
        </div>
      </footer>

    </div>
  )
}
