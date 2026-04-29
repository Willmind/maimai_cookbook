import type { SupabaseClient } from '@supabase/supabase-js'

import { mapNewRecipeInput, mapRecipeRow, mapUpdateRecipeInput, type RecipeRow } from '@/data/supabase/recipeMapper'
import type { NewRecipeInput, UpdateRecipeInput } from '@/types/recipe'

import type { RecipeRepository } from './recipeRepository'

const selectColumns =
  'id,name,source,description,cover_image_path,ingredients,method,next_note,familiarity,want_to_make,tags,created_at,updated_at'

function assertRecipeRow(row: RecipeRow | null) {
  if (!row) {
    throw new Error('Supabase did not return the created recipe.')
  }

  return row
}

export function createSupabaseRecipeRepository(client: SupabaseClient): RecipeRepository {
  return {
    async list() {
      const { data, error } = await client.from('recipes').select(selectColumns).order('updated_at', { ascending: false })

      if (error) throw error

      return (data as RecipeRow[]).map(mapRecipeRow)
    },

    async getById(id) {
      const { data, error } = await client.from('recipes').select(selectColumns).eq('id', id).maybeSingle()

      if (error) throw error

      return data ? mapRecipeRow(data as RecipeRow) : undefined
    },

    async create(input: NewRecipeInput) {
      const { data, error } = await client
        .from('recipes')
        .insert(mapNewRecipeInput(input))
        .select(selectColumns)
        .single()

      if (error) throw error

      return mapRecipeRow(assertRecipeRow(data as RecipeRow | null))
    },

    async update(id: string, input: UpdateRecipeInput) {
      const { data, error } = await client
        .from('recipes')
        .update(mapUpdateRecipeInput(input))
        .eq('id', id)
        .select(selectColumns)
        .single()

      if (error) throw error

      return mapRecipeRow(assertRecipeRow(data as RecipeRow | null))
    },
  }
}
