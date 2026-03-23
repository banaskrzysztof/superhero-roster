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
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <Link
          href={ROUTES.HOME}
          className="text-foreground-muted hover:text-foreground w-fit text-sm transition-colors"
        >
          ← Back to roster
        </Link>

        <div className="mt-6 mb-8">
          <h1 className="text-foreground text-2xl font-bold">{hero.name} details</h1>
        </div>

        <Card className="max-h-screen max-w-2xl self-start overflow-hidden">
          <div className="relative h-96 max-h-[40vh] sm:h-128">
            <Image
              loading="eager"
              fetchPriority="high"
              src={hero.image}
              alt={hero.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="rounded-t-lg object-cover object-[center_25%]"
            />
          </div>

          <div className="flex h-auto flex-col gap-4 overflow-y-auto p-6">
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
    </div>
  )
}
