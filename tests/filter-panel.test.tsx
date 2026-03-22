import { render, screen, fireEvent } from '@testing-library/react'
import { POWER_TYPES, UNIVERSES } from '@/types/hero'
import { FilterPanel } from '@/components/layout/filter-panel'

const mockReplace = jest.fn()
const mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  usePathname: () => '/',
  useSearchParams: () => mockSearchParams,
}))

describe('FilterPanel', () => {
  beforeEach(() => {
    mockReplace.mockClear()
    mockSearchParams.forEach((_, key) => mockSearchParams.delete(key))
  })

  it('renders all universe buttons', () => {
    render(<FilterPanel />)
    UNIVERSES.forEach((u) => expect(screen.getByText(u)).toBeInTheDocument())
  })

  it('renders all power buttons', () => {
    render(<FilterPanel />)
    POWER_TYPES.forEach((p) => expect(screen.getByText(p)).toBeInTheDocument())
  })

  it('calls router.replace with correct param on universe click', () => {
    render(<FilterPanel />)
    fireEvent.click(screen.getByText(UNIVERSES[0]))
    expect(mockReplace).toHaveBeenCalledWith(`/?universe=${UNIVERSES[0]}`, { scroll: false })
  })

  it('calls router.replace with correct param on power click', () => {
    render(<FilterPanel />)
    fireEvent.click(screen.getByText(POWER_TYPES[0]))
    expect(mockReplace).toHaveBeenCalledWith(`/?power=${POWER_TYPES[0]}`, { scroll: false })
  })

  it('does not show clear button when no filters active', () => {
    render(<FilterPanel />)
    expect(screen.queryByText(/clear filters/i)).not.toBeInTheDocument()
  })

  it('shows clear button when filters are active', () => {
    mockSearchParams.set('universe', UNIVERSES[0])
    render(<FilterPanel />)
    expect(screen.getByText(/clear filters/i)).toBeInTheDocument()
  })

  it('clears filters on clear button click', () => {
    mockSearchParams.set('universe', UNIVERSES[0])
    render(<FilterPanel />)
    fireEvent.click(screen.getByText(/clear filters/i))
    expect(mockReplace).toHaveBeenCalledWith('/', { scroll: false })
  })

  it('removes param when clicking already active filter', () => {
    mockSearchParams.set('universe', UNIVERSES[0])
    render(<FilterPanel />)
    fireEvent.click(screen.getByText(UNIVERSES[0]))
    expect(mockReplace).toHaveBeenCalledWith('/?', { scroll: false })
  })
})
