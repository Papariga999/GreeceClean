import { describe, expect, it } from 'vitest'
import { VALID_CATEGORIES } from '../../lib/categories'
import en from '../../lib/i18n/en.json'
import el from '../../lib/i18n/el.json'
import de from '../../lib/i18n/de.json'

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue }

function isObject(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function collectKeyPaths(value: JsonValue, prefix = ''): string[] {
  if (Array.isArray(value)) {
    const arrayPath = `${prefix}[]`
    const childPaths = value.flatMap((item) => collectKeyPaths(item, arrayPath))
    return [arrayPath, ...childPaths]
  }
  if (!isObject(value)) return []

  return Object.keys(value).flatMap((key) => {
    const path = prefix ? `${prefix}.${key}` : key
    return [path, ...collectKeyPaths(value[key], path)]
  })
}

function sortedUnique(values: string[]): string[] {
  return [...new Set(values)].sort()
}

describe('i18n dictionaries', () => {
  it('keeps identical nested key paths across locales', () => {
    const enKeys = sortedUnique(collectKeyPaths(en as JsonValue))

    expect(sortedUnique(collectKeyPaths(el as JsonValue))).toEqual(enKeys)
    expect(sortedUnique(collectKeyPaths(de as JsonValue))).toEqual(enKeys)
  })

  it('keeps category IDs aligned with server validation', () => {
    const publicCategoryIds = en.form.categories.map((category) => category.id).sort()
    const labelIds = Object.keys(en.form.categoryLabels).sort()

    expect(labelIds).toEqual(VALID_CATEGORIES.slice().sort())
    expect(publicCategoryIds.every((id) => VALID_CATEGORIES.includes(id))).toBe(true)
    expect(el.form.categories.map((category) => category.id).sort()).toEqual(publicCategoryIds)
    expect(de.form.categories.map((category) => category.id).sort()).toEqual(publicCategoryIds)
  })
})
