import type { NewRecipeInput, Recipe, UpdateRecipeInput } from '@/types/recipe'

export interface RecipeRepository {
  list(): Promise<Recipe[]>
  getById(id: string): Promise<Recipe | undefined>
  create(input: NewRecipeInput): Promise<Recipe>
  update(id: string, input: UpdateRecipeInput): Promise<Recipe>
}

