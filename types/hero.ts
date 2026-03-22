export const UNIVERSES = ['Marvel', 'DC', 'Other'] as const
export const POWER_TYPES = ['Strength', 'Speed', 'Intelligence', 'Magic'] as const

export type PowerType = (typeof POWER_TYPES)[number]
export type Universe = (typeof UNIVERSES)[number]
export type HeroType = 'hero' | 'villain'

export interface Hero {
  slug: string
  name: string
  score: number
  type: HeroType
  universe: Universe
  weakness?: string
  aliases: string[]
  powers: PowerType[]
  description: string
  image: string
}
