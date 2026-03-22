'use client'

import HeartIcon from '@/assets/icons/heart.svg'
import { useFavorites } from '@/providers/favorites-provider'

interface FavoriteButtonProps {
  slug: string
}

export function FavoriteButton({ slug }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(slug)

  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        toggleFavorite(slug)
      }}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
      className="bg-background-card/80 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-sm transition-transform hover:scale-110"
    >
      <HeartIcon
        width={20}
        height={20}
        fill={active ? 'currentColor' : 'none'}
        className={active ? 'text-villain' : 'text-foreground-muted'}
      />
    </button>
  )
}
