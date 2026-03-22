import { cn } from '@/utils/cn'

describe('cn utility', () => {
  it('should merge class names', () => {
    const result = cn('bg-red-500', 'text-white')
    expect(result).toBe('bg-red-500 text-white')
  })

  it('should handle conditional classes', () => {
    const result = cn('base-class', true && 'active', false && 'inactive')
    expect(result).toBe('base-class active')
  })

  it('should merge conflicting Tailwind classes', () => {
    const result = cn('p-4', 'p-8')
    expect(result).toBe('p-8')
  })

  it('should handle undefined and null', () => {
    const result = cn('base', undefined, null, 'other')
    expect(result).toBe('base other')
  })

  it('should handle arrays', () => {
    const result = cn(['flex', 'items-center'], 'justify-between')
    expect(result).toBe('flex items-center justify-between')
  })

  it('should handle objects', () => {
    const result = cn({
      'bg-blue-500': true,
      'text-white': false,
      'rounded-md': true,
    })
    expect(result).toBe('bg-blue-500 rounded-md')
  })
})
