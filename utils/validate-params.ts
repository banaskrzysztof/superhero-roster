import { UNIVERSES, POWER_TYPES, type Universe, type PowerType } from '@/types/hero'

export function isValidUniverse(value: string | null): value is Universe {
  if (!value) return false
  return UNIVERSES.includes(value as Universe)
}

export function isValidPowerType(value: string | null): value is PowerType {
  if (!value) return false
  return POWER_TYPES.includes(value as PowerType)
}

export interface ValidatedSearchParams {
  q?: string
  universe?: Universe
  power?: PowerType
}

export function validateSearchParams(params: {
  q?: string | undefined
  universe?: string | undefined
  power?: string | undefined
}): ValidatedSearchParams {
  const validated: ValidatedSearchParams = {}

  if (params.q) {
    validated.q = params.q
  }

  if (params.universe && isValidUniverse(params.universe)) {
    validated.universe = params.universe
  }

  if (params.power && isValidPowerType(params.power)) {
    validated.power = params.power
  }

  return validated
}
