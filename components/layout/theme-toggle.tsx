'use client'

import { useTheme } from 'next-themes'
import { useMounted } from '@/hooks/use-mounted'
import MoonIcon from '@/assets/icons/moon.svg'
import SunIcon from '@/assets/icons/sun.svg'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) return <div className="h-8 w-auto" />

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="text-foreground-muted hover:bg-background-subtle hover:text-foreground flex cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
    >
      {isDark ? (
        <>
          <SunIcon width={16} height={16} />
          <span className="hidden sm:inline">Light mode</span>
        </>
      ) : (
        <>
          <MoonIcon width={16} height={16} />
          <span className="hidden sm:inline">Dark mode</span>
        </>
      )}
    </button>
  )
}
