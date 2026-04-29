import type { NewRecipeInput, Recipe, RecipeFamiliarity, UpdateRecipeInput } from '@/types/recipe'

export interface RecipeRow {
  id: string
  name: string
  source: string | null
  description: string | null
  cover_image_path: string | null
  ingredients: string | null
  method: string | null
  next_note: string | null
  familiarity: RecipeFamiliarity
  want_to_make: boolean
  tags: string[] | null
  created_at: string
  updated_at: string
}

export function mapRecipeRow(row: RecipeRow): Recipe {
  return {
    id: row.id,
    name: row.name,
    source: row.source ?? undefined,
    description: row.description ?? undefined,
    coverImagePath: row.cover_image_path ?? undefined,
    ingredients: row.ingredients ?? undefined,
    method: row.method ?? undefined,
    nextNote: row.next_note ?? undefined,
    familiarity: row.familiarity,
    wantToMake: row.want_to_make,
    tags: row.tags ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function mapNewRecipeInput(input: NewRecipeInput) {
  return {
    name: input.name,
    source: input.source ?? null,
    description: input.description ?? null,
    cover_image_path: input.coverImagePath ?? null,
    ingredients: input.ingredients ?? null,
    method: input.method ?? null,
    next_note: input.nextNote ?? null,
    familiarity: input.familiarity ?? 'new',
    want_to_make: input.wantToMake ?? true,
    tags: input.tags ?? [],
  }
}

export function mapUpdateRecipeInput(input: UpdateRecipeInput) {
  return {
    name: input.name,
    source: input.source ?? null,
    description: input.description ?? null,
    cover_image_path: input.coverImagePath ?? null,
    ingredients: input.ingredients ?? null,
    method: input.method ?? null,
    next_note: input.nextNote ?? null,
    familiarity: input.familiarity ?? 'new',
    want_to_make: input.wantToMake ?? true,
    tags: input.tags ?? [],
  }
}
