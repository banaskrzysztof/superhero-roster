import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { FavoriteButton } from './favorite-button'
import { ROUTES } from '@/constants/routes'
import type { Hero } from '@/types/hero'

interface HeroCardProps {
  hero: Hero
}

export function HeroCard({ hero }: HeroCardProps) {
  return (
    <Card hoverable className="relative flex flex-col overflow-hidden">
      <Link href={ROUTES.HERO(hero.slug)}>
        <div className="relative h-48 w-full">
          <Image
            loading="eager"
            fetchPriority="high"
            src={hero.image}
            alt={hero.name}
            fill
            className="object-cover object-[center_25%]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-foreground text-lg leading-tight font-bold">{hero.name}</h2>
            <Badge variant={hero.type}>{hero.type}</Badge>
          </div>
          {hero.aliases.length > 0 && (
            <p className="text-foreground-muted text-xs">{hero.aliases.join(', ')}</p>
          )}
          <div className="mt-1 flex flex-wrap gap-1">
            {hero.powers.map((power) => (
              <Badge key={power} variant="default">
                {power}
              </Badge>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-foreground-muted text-xs">{hero.universe}</span>
            <span className="text-brand-accent text-sm font-semibold">{hero.score}</span>
          </div>
          {hero.weakness && (
            <p className="text-foreground-muted text-xs">
              Weakness: <span className="text-villain">{hero.weakness}</span>
            </p>
          )}
        </div>
      </Link>
      <div className="absolute top-2 right-2">
        <FavoriteButton slug={hero.slug} />
      </div>
    </Card>
  )
}
