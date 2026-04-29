import { mockCookingLogs } from '@/data/mock/cooking-logs'
import { mockRecipes } from '@/data/mock/recipes'
import { getSupabaseClient } from '@/data/supabase/client'

import { resolveDataSource, type DataSource } from './dataSource'
import { createMockCookingLogRepository } from './mockCookingLogRepository'
import { createMockRecipeRepository } from './mockRecipeRepository'
import { createSupabaseCookingLogRepository } from './supabaseCookingLogRepository'
import { createSupabaseRecipeRepository } from './supabaseRecipeRepository'
import type { CookingLogRepository } from './cookingLogRepository'
import type { RecipeRepository } from './recipeRepository'

interface Repositories {
  recipeRepository: RecipeRepository
  cookingLogRepository: CookingLogRepository
}

export function createRepositories(dataSource: DataSource = resolveDataSource()): Repositories {
  if (dataSource === 'mock') {
    return {
      recipeRepository: createMockRecipeRepository(mockRecipes),
      cookingLogRepository: createMockCookingLogRepository(mockCookingLogs),
    }
  }

  const supabaseClient = getSupabaseClient()

  return {
    recipeRepository: createSupabaseRecipeRepository(supabaseClient),
    cookingLogRepository: createSupabaseCookingLogRepository(supabaseClient),
  }
}

const repositories = createRepositories()

export const { recipeRepository, cookingLogRepository } = repositories
