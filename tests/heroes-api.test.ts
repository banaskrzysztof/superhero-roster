import { heroesData } from '@/utils/heroes-data'

describe('heroes data', () => {
  it('returns all heroes', () => {
    expect(heroesData.length).toBeGreaterThan(0)
  })

  it('finds hero by slug', () => {
    const hero = heroesData.find((h) => h.slug === heroesData[0]?.slug)
    expect(hero).toBeDefined()
  })

  it('returns undefined for unknown slug', () => {
    const hero = heroesData.find((h) => h.slug === 'unknown-xyz')
    expect(hero).toBeUndefined()
  })
})
