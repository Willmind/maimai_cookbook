import { describe, expect, it } from 'vitest'

import { getResizedDimensions } from './imageCompression'

describe('image compression helpers', () => {
  it('keeps images smaller than the max size unchanged', () => {
    expect(getResizedDimensions({ width: 1200, height: 900 }, 1600)).toEqual({ width: 1200, height: 900 })
  })

  it('scales landscape images by the longest side', () => {
    expect(getResizedDimensions({ width: 4000, height: 3000 }, 1600)).toEqual({ width: 1600, height: 1200 })
  })

  it('scales portrait images by the longest side', () => {
    expect(getResizedDimensions({ width: 3000, height: 4000 }, 1600)).toEqual({ width: 1200, height: 1600 })
  })
})
