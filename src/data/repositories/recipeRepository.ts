import type { NewRecipeInput, Recipe } from '@/types/recipe'

export interface RecipeRepository {
  list(): Promise<Recipe[]>
  getById(id: string): Promise<Recipe | undefined>
  create(input: NewRecipeInput): Promise<Recipe>
}

