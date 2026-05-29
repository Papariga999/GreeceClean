import { describe, expect, it } from 'vitest'
import { normalizeGreekName, pickMunicipalityName } from '../../lib/geocoding'

describe('normalizeGreekName', () => {
  it('removes accents, punctuation, and municipality prefixes', () => {
    expect(normalizeGreekName('Δήμος Αθηναίων')).toBe('αθηναιων')
    expect(normalizeGreekName('Κοινότητα Αγ. Νικολάου')).toBe('αγ νικολαου')
  })
})

describe('pickMunicipalityName', () => {
  it('prefers municipality-level fields before broader regions', () => {
    expect(pickMunicipalityName({ municipality: 'Δήμος Ρόδου', county: 'Ρόδος' })).toBe('Δήμος Ρόδου')
    expect(pickMunicipalityName({ county: 'Νάξος', state: 'Νότιο Αιγαίο' })).toBe('Νάξος')
  })
})
