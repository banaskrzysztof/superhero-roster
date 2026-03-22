import { cn } from '@/utils/cn'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-foreground text-sm font-medium">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full rounded-md px-3 py-2 text-sm',
          'bg-background text-foreground placeholder:text-foreground-muted',
          'border-border focus:border-brand-primary border',
          'transition-colors outline-none',
          error && 'border-villain',
          className,
        )}
        {...props}
      />
      {error && <span className="text-villain text-xs">{error}</span>}
    </div>
  )
}
