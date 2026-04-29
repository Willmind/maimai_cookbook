import type { SupabaseClient } from '@supabase/supabase-js'

import { mapCookingLogRow, mapNewCookingLogInput, type CookingLogRow } from '@/data/supabase/cookingLogMapper'
import type { NewCookingLogInput } from '@/types/cooking-log'

import type { CookingLogRepository } from './cookingLogRepository'

const selectColumns = 'id,recipe_id,cooked_at,result,note,changes,next_note,photo_path,created_at'

function assertCookingLogRow(row: CookingLogRow | null) {
  if (!row) {
    throw new Error('Supabase did not return the created cooking log.')
  }

  return row
}

export function createSupabaseCookingLogRepository(client: SupabaseClient): CookingLogRepository {
  return {
    async list() {
      const { data, error } = await client.from('cooking_logs').select(selectColumns).order('cooked_at', { ascending: false })

      if (error) throw error

      return (data as CookingLogRow[]).map(mapCookingLogRow)
    },

    async listByRecipeId(recipeId) {
      const { data, error } = await client
        .from('cooking_logs')
        .select(selectColumns)
        .eq('recipe_id', recipeId)
        .order('cooked_at', { ascending: false })

      if (error) throw error

      return (data as CookingLogRow[]).map(mapCookingLogRow)
    },

    async create(input: NewCookingLogInput) {
      const { data, error } = await client
        .from('cooking_logs')
        .insert(mapNewCookingLogInput(input))
        .select(selectColumns)
        .single()

      if (error) throw error

      return mapCookingLogRow(assertCookingLogRow(data as CookingLogRow | null))
    },
  }
}
