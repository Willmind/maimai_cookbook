import { describe, expect, it } from 'vitest'

import { buildImagePath, safeFileName } from './imageStorage'

describe('image storage helpers', () => {
  it('normalizes unsafe file names', () => {
    expect(safeFileName(' 成品 照片.JPG ')).toBe('jpg')
    expect(safeFileName('cover photo 01.webp')).toBe('cover-photo-01.webp')
  })

  it('builds deterministic paths with a prefix and timestamp', () => {
    expect(buildImagePath('recipes/draft', 'cover photo.webp', 123)).toBe('recipes/draft/123-cover-photo.webp')
  })
})
