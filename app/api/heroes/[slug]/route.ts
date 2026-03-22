import { heroesData } from '@/utils/heroes-data'
import { NextResponse } from 'next/server'

interface Params {
  params: Promise<{ slug: string }>
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params
  const hero = heroesData.find((h) => h.slug === slug)

  if (!hero) {
    return NextResponse.json({ error: 'Hero not found' }, { status: 404 })
  }

  return NextResponse.json(hero)
}
