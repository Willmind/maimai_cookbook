import { describe, expect, it } from 'vitest'

import { mockCookingLogs } from '@/data/mock/cooking-logs'
import { mockRecipes } from '@/data/mock/recipes'

import { filterRecipes, searchCookbook } from './search'

describe('searchCookbook', () => {
  it('groups recipes before cooking logs and prioritizes recipe name matches', () => {
    const result = searchCookbook('番茄', mockRecipes, mockCookingLogs)

    expect(result.recipes.map((recipe) => recipe.name)).toEqual(['番茄炒蛋'])
    expect(result.logs.map((log) => log.cookedAt)).toEqual(['2026-04-26', '2026-04-12'])
  })

  it('can match recipes by tag and ingredients', () => {
    const result = searchCookbook('快手', mockRecipes, mockCookingLogs)

    expect(result.recipes.map((recipe) => recipe.name)).toContain('番茄炒蛋')
    expect(result.recipes.map((recipe) => recipe.name)).toContain('葱油拌面')
  })
})

describe('filterRecipes', () => {
  it('filters want-to-make recipes', () => {
    expect(filterRecipes(mockRecipes, 'want').map((recipe) => recipe.name)).toEqual(['番茄炒蛋', '照烧鸡腿饭'])
  })

  it('filters recipes by familiarity', () => {
    expect(filterRecipes(mockRecipes, 'new').map((recipe) => recipe.name)).toEqual(['照烧鸡腿饭'])
    expect(filterRecipes(mockRecipes, 'frequent').map((recipe) => recipe.name)).toEqual(['番茄炒蛋', '葱油拌面'])
  })
})

