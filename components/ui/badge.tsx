import { cn } from '@/utils/cn'
import type { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'hero' | 'villain' | 'default'
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-medium',
        {
          'bg-hero/10 text-hero': variant === 'hero',
          'bg-villain/10 text-villain': variant === 'villain',
          'bg-background-subtle text-foreground-muted': variant === 'default',
        },
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
