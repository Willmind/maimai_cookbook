import { describe, expect, it } from 'vitest'

import { createMockRecipeRepository } from './mockRecipeRepository'

describe('mock recipe repository', () => {
  it('creates a recipe with MVP defaults when only a name is provided', async () => {
    const repository = createMockRecipeRepository([])

    const recipe = await repository.create({ name: '番茄炒蛋' })

    expect(recipe.name).toBe('番茄炒蛋')
    expect(recipe.wantToMake).toBe(true)
    expect(recipe.familiarity).toBe('new')
    expect(recipe.tags).toEqual([])
  })
})

