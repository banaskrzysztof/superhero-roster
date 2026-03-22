import { notFound } from 'next/navigation'
import { getHero, getHeroes } from '@/utils/heroes'
import { HeroDetail } from '@/components/heroes/hero-detail'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const heroes = await getHeroes()
  return heroes.map((hero) => ({ slug: hero.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const hero = await getHero(slug)
  if (!hero) return {}

  return {
    title: `${hero.name} | Superhero Roster`,
    description: hero.description,
  }
}

export default async function HeroPage({ params }: PageProps) {
  const { slug } = await params
  const hero = await getHero(slug)

  if (!hero) notFound()

  return <HeroDetail hero={hero} />
}
