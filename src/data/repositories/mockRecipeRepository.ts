import type { NewRecipeInput, Recipe, UpdateRecipeInput } from '@/types/recipe'

import type { RecipeRepository } from './recipeRepository'

const nowIso = () => new Date().toISOString()

export function createMockRecipeRepository(initialRecipes: Recipe[]): RecipeRepository {
  const recipes = [...initialRecipes]

  return {
    async list() {
      return [...recipes]
    },

    async getById(id) {
      return recipes.find((recipe) => recipe.id === id)
    },

    async create(input: NewRecipeInput) {
      const name = input.name.trim()

      if (!name) {
        throw new Error('name is required')
      }

      const timestamp = nowIso()
      const recipe: Recipe = {
        id: `recipe-${crypto.randomUUID()}`,
        name,
        source: input.source,
        description: input.description,
        coverImagePath: input.coverImagePath,
        ingredients: input.ingredients,
        method: input.method,
        nextNote: input.nextNote,
        familiarity: input.familiarity ?? 'new',
        wantToMake: input.wantToMake ?? true,
        tags: input.tags ?? [],
        createdAt: timestamp,
        updatedAt: timestamp,
      }

      recipes.push(recipe)
      return recipe
    },

    async update(id: string, input: UpdateRecipeInput) {
      const index = recipes.findIndex((recipe) => recipe.id === id)
      if (index < 0) {
        throw new Error('recipe not found')
      }

      const name = input.name.trim()
      if (!name) {
        throw new Error('name is required')
      }

      const nextRecipe: Recipe = {
        ...recipes[index],
        name,
        source: input.source,
        description: input.description,
        coverImagePath: input.coverImagePath,
        ingredients: input.ingredients,
        method: input.method,
        nextNote: input.nextNote,
        familiarity: input.familiarity ?? recipes[index].familiarity,
        wantToMake: input.wantToMake ?? recipes[index].wantToMake,
        tags: input.tags ?? recipes[index].tags,
        updatedAt: nowIso(),
      }

      recipes[index] = nextRecipe
      return nextRecipe
    },
  }
}

