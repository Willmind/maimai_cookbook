import type { CookingLog } from '@/types/cooking-log'
import type { Recipe } from '@/types/recipe'

export type RecipeFilter = 'all' | 'want' | 'new' | 'done' | 'frequent'

export interface CookbookSearchResult {
  recipes: Recipe[]
  logs: CookingLog[]
}

const normalize = (value: string) => value.trim().toLocaleLowerCase()

const includesKeyword = (value: string | undefined, keyword: string) => {
  return Boolean(value?.toLocaleLowerCase().includes(keyword))
}

const recipeSearchRank = (recipe: Recipe, keyword: string) => {
  if (includesKeyword(recipe.name, keyword)) return 0
  if (recipe.tags.some((tag) => includesKeyword(tag, keyword))) return 1
  if (includesKeyword(recipe.ingredients, keyword)) return 2
  if (includesKeyword(recipe.method, keyword)) return 3
  if (includesKeyword(recipe.description, keyword) || includesKeyword(recipe.nextNote, keyword)) return 4
  return Number.POSITIVE_INFINITY
}

export function searchCookbook(keywordInput: string, recipes: Recipe[], logs: CookingLog[]): CookbookSearchResult {
  const keyword = normalize(keywordInput)

  if (!keyword) {
    return { recipes: [], logs: [] }
  }

  const recipeIdsByName = new Set(
    recipes.filter((recipe) => includesKeyword(recipe.name, keyword)).map((recipe) => recipe.id),
  )

  const matchingRecipes = recipes
    .map((recipe) => ({ recipe, rank: recipeSearchRank(recipe, keyword) }))
    .filter(({ rank }) => Number.isFinite(rank))
    .sort((a, b) => a.rank - b.rank || b.recipe.updatedAt.localeCompare(a.recipe.updatedAt))
    .map(({ recipe }) => recipe)

  const matchingLogs = logs
    .filter((log) => {
      return (
        recipeIdsByName.has(log.recipeId) ||
        includesKeyword(log.note, keyword) ||
        includesKeyword(log.changes, keyword) ||
        includesKeyword(log.nextNote, keyword)
      )
    })
    .sort((a, b) => b.cookedAt.localeCompare(a.cookedAt))

  return {
    recipes: matchingRecipes,
    logs: matchingLogs,
  }
}

export function filterRecipes(recipes: Recipe[], filter: RecipeFilter) {
  if (filter === 'all') return recipes
  if (filter === 'want') return recipes.filter((recipe) => recipe.wantToMake)
  return recipes.filter((recipe) => recipe.familiarity === filter)
}

