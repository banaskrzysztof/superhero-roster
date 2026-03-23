import { render, screen } from '@testing-library/react'
import { HeroCard } from '@/components/heroes/hero-card'
import type { Hero } from '@/types/hero'
import type { ReactNode } from 'react'

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}))

jest.mock('@/components/heroes/favorite-button', () => ({
  FavoriteButton: ({ slug }: { slug: string }) => <button data-testid={`fav-${slug}`} />,
}))

const hero: Hero = {
  slug: 'spider-man',
  name: 'Spider-Man',
  aliases: ['Peter Parker'],
  type: 'hero',
  universe: 'Marvel',
  score: 95,
  powers: ['Strength', 'Speed'],
  weakness: 'Ethyl chloride',
  image: '/spiderman.png',
  description: 'Friendly neighbourhood Spider-Man',
}

describe('HeroCard', () => {
  it('renders hero name', () => {
    render(<HeroCard hero={hero} />)
    expect(screen.getByText('Spider-Man')).toBeInTheDocument()
  })

  it('renders aliases', () => {
    render(<HeroCard hero={hero} />)
    expect(screen.getByText('Peter Parker')).toBeInTheDocument()
  })

  it('renders all powers as badges', () => {
    render(<HeroCard hero={hero} />)
    expect(screen.getByText('Strength')).toBeInTheDocument()
    expect(screen.getByText('Speed')).toBeInTheDocument()
  })

  it('renders universe and score', () => {
    render(<HeroCard hero={hero} />)
    expect(screen.getByText('Marvel')).toBeInTheDocument()
    expect(screen.getByText('95')).toBeInTheDocument()
  })

  it('renders weakness', () => {
    render(<HeroCard hero={hero} />)
    expect(screen.getByText('Ethyl chloride')).toBeInTheDocument()
  })

  it('does not render aliases section when empty', () => {
    render(<HeroCard hero={{ ...hero, aliases: [] }} />)
    expect(screen.queryByText('Peter Parker')).not.toBeInTheDocument()
  })

  it('links to correct hero page', () => {
    render(<HeroCard hero={hero} />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/heroes/spider-man')
  })

  it('renders favorite button with correct slug', () => {
    render(<HeroCard hero={hero} />)
    expect(screen.getByTestId('fav-spider-man')).toBeInTheDocument()
  })
})
