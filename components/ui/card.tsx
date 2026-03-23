import { cn } from '@/utils/cn'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'border-border bg-background-card shadow-card rounded-lg border',
        hoverable &&
          'hover:shadow-card-hover cursor-pointer transition-all duration-200 hover:-translate-y-1',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
