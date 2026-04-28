import type { CookingLog, NewCookingLogInput } from '@/types/cooking-log'

export interface CookingLogRepository {
  list(): Promise<CookingLog[]>
  listByRecipeId(recipeId: string): Promise<CookingLog[]>
  create(input: NewCookingLogInput): Promise<CookingLog>
}

