import { getHeroes, getHero } from '@/utils/heroes'

global.fetch = jest.fn()

describe('Heroes Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getHeroes', () => {
    it('should fetch all heroes', async () => {
      const mockHeroes = {
        items: [
          { slug: 'batman', name: 'Batman' },
          { slug: 'superman', name: 'Superman' },
        ],
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockHeroes,
      })

      const result = await getHeroes()

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          next: { revalidate: 3600 },
        }),
      )
      expect(result).toEqual(mockHeroes.items)
    })

    it('should throw error when fetch fails', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      })

      await expect(getHeroes()).rejects.toThrow('Failed to fetch heroes')
    })
  })

  describe('getHero', () => {
    it('should fetch a single hero', async () => {
      const mockHero = { slug: 'batman', name: 'Batman' }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockHero,
      })

      const result = await getHero('batman')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/batman'),
        expect.objectContaining({
          cache: 'force-cache',
        }),
      )
      expect(result).toEqual(mockHero)
    })

    it('should return null when hero not found', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 404,
      })

      const result = await getHero('non-existent')

      expect(result).toBeNull()
    })

    it('should throw error when fetch fails with non-404 error', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      })

      await expect(getHero('batman')).rejects.toThrow('Failed to fetch hero')
    })
  })
})
