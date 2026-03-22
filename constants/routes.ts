export const ROUTES = {
  HOME: '/',
  HERO: (slug: string) => `/heroes/${slug}`,
  FAVORITES: '/heroes/favorites',
} as const
