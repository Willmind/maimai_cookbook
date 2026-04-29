import type { CookingLog, CookingResult, NewCookingLogInput, UpdateCookingLogInput } from '@/types/cooking-log'

export interface CookingLogRow {
  id: string
  recipe_id: string
  cooked_at: string
  result: CookingResult | null
  note: string | null
  changes: string | null
  next_note: string | null
  photo_path: string | null
  created_at: string
}

export function mapCookingLogRow(row: CookingLogRow): CookingLog {
  return {
    id: row.id,
    recipeId: row.recipe_id,
    cookedAt: row.cooked_at,
    result: row.result ?? undefined,
    note: row.note ?? undefined,
    changes: row.changes ?? undefined,
    nextNote: row.next_note ?? undefined,
    photoPath: row.photo_path ?? undefined,
    createdAt: row.created_at,
  }
}

export function mapNewCookingLogInput(input: NewCookingLogInput) {
  return {
    recipe_id: input.recipeId,
    cooked_at: input.cookedAt ?? new Date().toISOString().slice(0, 10),
    result: input.result ?? null,
    note: input.note ?? null,
    changes: input.changes ?? null,
    next_note: input.nextNote ?? null,
    photo_path: input.photoPath ?? null,
  }
}

export function mapUpdateCookingLogInput(input: UpdateCookingLogInput) {
  return {
    cooked_at: input.cookedAt ?? new Date().toISOString().slice(0, 10),
    result: input.result ?? null,
    note: input.note ?? null,
    changes: input.changes ?? null,
    next_note: input.nextNote ?? null,
    photo_path: input.photoPath ?? null,
  }
}
