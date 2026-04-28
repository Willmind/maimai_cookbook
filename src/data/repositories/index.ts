import { mockCookingLogs } from '@/data/mock/cooking-logs'
import { mockRecipes } from '@/data/mock/recipes'

import { createMockCookingLogRepository } from './mockCookingLogRepository'
import { createMockRecipeRepository } from './mockRecipeRepository'

export const recipeRepository = createMockRecipeRepository(mockRecipes)
export const cookingLogRepository = createMockCookingLogRepository(mockCookingLogs)

