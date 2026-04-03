import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email, nome, culto, data, horario, funcao } = await req.json()

  await resend.emails.send({
    from: 'EscalaFácil <onboarding@resend.dev>',
    to: email,
    subject: `Você está escalado: ${culto}`,
    html: `
      <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:32px;background:#0f0f0f;color:#fff;border-radius:16px">
        <div style="text-align:center;margin-bottom:24px">
          <div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);width:56px;height:56px;border-radius:14px;display:inline-flex;align-items:center;justify-content:center;font-size:28px">⛪</div>
          <h1 style="font-size:20px;margin:12px 0 4px">EscalaFácil</h1>
          <p style="color:#9ca3af;font-size:13px;margin:0">Sistema de Escalas para Igrejas</p>
        </div>
        <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:24px;margin-bottom:20px">
          <p style="color:#a5b4fc;font-size:13px;margin:0 0 8px">Olá, <strong style="color:#fff">${nome}</strong>!</p>
          <p style="color:#e5e7eb;font-size:15px;margin:0 0 20px">Você foi escalado para o seguinte culto:</p>
          <div style="border-left:3px solid #6366f1;padding-left:16px;margin-bottom:16px">
            <p style="margin:0 0 6px;font-size:16px;font-weight:600;color:#fff">${culto}</p>
            <p style="margin:0 0 4px;color:#9ca3af;font-size:13px">📅 ${data}</p>
            <p style="margin:0 0 4px;color:#9ca3af;font-size:13px">🕐 ${horario}</p>
            <p style="margin:0;color:#a5b4fc;font-size:13px">🎵 ${funcao}</p>
          </div>
        </div>
        <p style="color:#6b7280;font-size:12px;text-align:center;margin:0">
          EscalaFácil · Sistema de Escalas para Igrejas
        </p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}