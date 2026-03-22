import { cn } from '@/utils/cn'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-brand-primary hover:bg-brand-primary-hover text-white': variant === 'primary',
          'border-border text-foreground hover:bg-background-subtle border':
            variant === 'secondary',
          'text-foreground-muted hover:bg-background-subtle hover:text-foreground':
            variant === 'ghost',
        },
        {
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
