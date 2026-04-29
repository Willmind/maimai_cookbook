import { describe, expect, it } from 'vitest'

import { mapNewRecipeInput, mapRecipeRow } from './recipeMapper'

describe('recipe mapper', () => {
  it('maps Supabase recipe rows to domain recipes', () => {
    expect(
      mapRecipeRow({
        id: 'recipe-1',
        name: '番茄炒蛋',
        source: null,
        description: '清爽版',
        cover_image_path: null,
        ingredients: '番茄',
        method: null,
        next_note: '少放糖',
        familiarity: 'done',
        want_to_make: true,
        tags: null,
        created_at: '2026-04-29T00:00:00.000Z',
        updated_at: '2026-04-29T00:00:00.000Z',
      }),
    ).toEqual({
      id: 'recipe-1',
      name: '番茄炒蛋',
      source: undefined,
      description: '清爽版',
      coverImagePath: undefined,
      ingredients: '番茄',
      method: undefined,
      nextNote: '少放糖',
      familiarity: 'done',
      wantToMake: true,
      tags: [],
      createdAt: '2026-04-29T00:00:00.000Z',
      updatedAt: '2026-04-29T00:00:00.000Z',
    })
  })

  it('maps new recipe input to Supabase insert payload with MVP defaults', () => {
    expect(mapNewRecipeInput({ name: '蒜香口蘑' })).toEqual({
      name: '蒜香口蘑',
      source: null,
      description: null,
      cover_image_path: null,
      ingredients: null,
      method: null,
      next_note: null,
      familiarity: 'new',
      want_to_make: true,
      tags: [],
    })
  })
})
