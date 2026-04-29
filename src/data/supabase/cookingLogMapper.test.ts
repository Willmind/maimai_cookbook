import { describe, expect, it } from 'vitest'

import { mapCookingLogRow, mapNewCookingLogInput } from './cookingLogMapper'

describe('cooking log mapper', () => {
  it('maps Supabase cooking log rows to domain cooking logs', () => {
    expect(
      mapCookingLogRow({
        id: 'log-1',
        recipe_id: 'recipe-1',
        cooked_at: '2026-04-29',
        result: null,
        note: '这次更嫩',
        changes: null,
        next_note: '火小一点',
        photo_path: null,
        created_at: '2026-04-29T00:00:00.000Z',
      }),
    ).toEqual({
      id: 'log-1',
      recipeId: 'recipe-1',
      cookedAt: '2026-04-29',
      result: undefined,
      note: '这次更嫩',
      changes: undefined,
      nextNote: '火小一点',
      photoPath: undefined,
      createdAt: '2026-04-29T00:00:00.000Z',
    })
  })

  it('maps new cooking log input to Supabase insert payload', () => {
    expect(
      mapNewCookingLogInput({
        recipeId: 'recipe-1',
        cookedAt: '2026-04-29',
        result: 'good',
      }),
    ).toEqual({
      recipe_id: 'recipe-1',
      cooked_at: '2026-04-29',
      result: 'good',
      note: null,
      changes: null,
      next_note: null,
      photo_path: null,
    })
  })
})
