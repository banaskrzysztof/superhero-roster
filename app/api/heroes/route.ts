import { heroesData } from '@/utils/heroes-data'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ items: heroesData })
}
