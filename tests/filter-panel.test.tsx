import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { POWER_TYPES, UNIVERSES } from '@/types/hero'
import { FilterPanel } from '@/components/layout/filter-panel'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}))

describe('FilterPanel', () => {
  const mockReplace = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ replace: mockReplace })
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams())
    ;(usePathname as jest.Mock).mockReturnValue('/')
  })

  it('renders all universe buttons', () => {
    render(<FilterPanel />)
    UNIVERSES.forEach((u) => expect(screen.getByText(u)).toBeInTheDocument())
  })

  it('renders all power buttons', () => {
    render(<FilterPanel />)
    POWER_TYPES.forEach((p) => expect(screen.getByText(p)).toBeInTheDocument())
  })

  it('calls router.replace with correct param on universe click', async () => {
    const user = userEvent.setup()
    render(<FilterPanel />)
    await user.click(screen.getByText(UNIVERSES[0]))
    expect(mockReplace).toHaveBeenCalledWith(`/?universe=${UNIVERSES[0]}`, { scroll: false })
  })

  it('calls router.replace with correct param on power click', async () => {
    const user = userEvent.setup()
    render(<FilterPanel />)
    await user.click(screen.getByText(POWER_TYPES[0]))
    expect(mockReplace).toHaveBeenCalledWith(`/?power=${POWER_TYPES[0]}`, { scroll: false })
  })

  it('does not show clear button when no filters active', () => {
    render(<FilterPanel />)
    expect(screen.queryByText(/clear filters/i)).not.toBeInTheDocument()
  })

  it('shows clear button when filters are active', () => {
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('universe=' + UNIVERSES[0]))
    render(<FilterPanel />)
    expect(screen.getByText(/clear filters/i)).toBeInTheDocument()
  })

  it('clears filters on clear button click', async () => {
    const user = userEvent.setup()
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('universe=' + UNIVERSES[0]))
    render(<FilterPanel />)
    await user.click(screen.getByText(/clear filters/i))
    expect(mockReplace).toHaveBeenCalledWith('/', { scroll: false })
  })

  it('removes param when clicking already active filter', async () => {
    const user = userEvent.setup()
    ;(useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('universe=' + UNIVERSES[0]))
    render(<FilterPanel />)
    await user.click(screen.getByText(UNIVERSES[0]))
    expect(mockReplace).toHaveBeenCalledWith('/?', { scroll: false })
  })
})
