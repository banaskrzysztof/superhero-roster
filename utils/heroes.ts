import type { Hero } from '@/types/hero'

const API_URL = process.env.NEXT_PUBLIC_API_URL
const REVALIDATE_TIME = 3600

export async function getHeroes(): Promise<Hero[]> {
  const res = await fetch(`${API_URL}`, {
    next: { revalidate: REVALIDATE_TIME },
  })

  if (!res.ok) throw new Error('Failed to fetch heroes')

  const data = await res.json()
  return data.items
}

export async function getHero(slug: string): Promise<Hero | null> {
  const res = await fetch(`${API_URL}/${slug}`, {
    cache: 'force-cache',
  })

  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch hero')

  return res.json()
}
