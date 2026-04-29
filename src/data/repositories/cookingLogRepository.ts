import type { CookingLog, NewCookingLogInput, UpdateCookingLogInput } from '@/types/cooking-log'

export interface CookingLogRepository {
  list(): Promise<CookingLog[]>
  getById(id: string): Promise<CookingLog | undefined>
  listByRecipeId(recipeId: string): Promise<CookingLog[]>
  create(input: NewCookingLogInput): Promise<CookingLog>
  update(id: string, input: UpdateCookingLogInput): Promise<CookingLog>
}

