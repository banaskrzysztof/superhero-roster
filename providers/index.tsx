import { ThemeProvider } from 'next-themes'
import { FavoritesProvider } from './favorites-provider'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ThemeProvider>
  )
}
