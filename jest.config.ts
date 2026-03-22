import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: ['**/tests/**/*.test.(ts|tsx)'],
}

export default createJestConfig(config)
