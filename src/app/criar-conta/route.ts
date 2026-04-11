import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { nomeIgreja, nomeAdmin, email, senha } = await req.json()

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: senha,
    email_confirm: true,
  })

  if (authError) {
    return NextResponse.json({ erro: authError.message }, { status: 400 })
  }

  const { data: igrejaData, error: igrejaError } = await supabaseAdmin
    .from('igrejas')
    .insert({ nome: nomeIgreja })
    .select()
    .single()

  if (igrejaError) {
    return NextResponse.json({ erro: 'Erro ao criar igreja!' }, { status: 400 })
  }

  await supabaseAdmin.from('usuarios').insert({
    id: authData.user.id,
    nome: nomeAdmin,
    email,
    tipo: 'admin',
    igreja_id: igrejaData.id,
  })

  return NextResponse.json({ ok: true })
}