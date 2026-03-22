import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { FavoriteButton } from './favorite-button'
import { ROUTES } from '@/constants/routes'
import type { Hero } from '@/types/hero'

interface HeroDetailProps {
  hero: Hero
}

export function HeroDetail({ hero }: HeroDetailProps) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href={ROUTES.HOME}
        className="text-foreground-muted hover:text-foreground w-fit text-sm transition-colors"
      >
        ← Back to roster
      </Link>

      <Card className="overflow-hidden">
        <div className="relative mx-auto aspect-4/5 max-h-200">
          <Image src={hero.image} alt={hero.name} fill className="object-contain" priority />
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-foreground text-3xl font-bold">{hero.name}</h1>
              {hero.aliases.length > 0 && (
                <p className="text-foreground-muted text-sm">{hero.aliases.join(', ')}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={hero.type}>{hero.type}</Badge>
              <FavoriteButton slug={hero.slug} />
            </div>
          </div>

          <p className="text-foreground leading-relaxed">{hero.description}</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="text-foreground-muted text-xs font-medium tracking-wide uppercase">
                Universe
              </span>
              <span className="text-foreground">{hero.universe}</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-foreground-muted text-xs font-medium tracking-wide uppercase">
                Score
              </span>
              <span className="text-brand-accent font-semibold">{hero.score}</span>
            </div>

            {hero.weakness && (
              <div className="flex flex-col gap-1">
                <span className="text-foreground-muted text-xs font-medium tracking-wide uppercase">
                  Weakness
                </span>
                <span className="text-villain">{hero.weakness}</span>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <span className="text-foreground-muted text-xs font-medium tracking-wide uppercase">
                Powers
              </span>
              <div className="flex flex-wrap gap-1">
                {hero.powers.map((power) => (
                  <Badge key={power} variant="default">
                    {power}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
