export type CookingResult = 'good' | 'ok' | 'failed'

export interface CookingLog {
  id: string
  recipeId: string
  cookedAt: string
  result?: CookingResult
  note?: string
  changes?: string
  nextNote?: string
  photoPath?: string
  createdAt: string
}

export interface NewCookingLogInput {
  recipeId: string
  cookedAt?: string
  result?: CookingResult
  note?: string
  changes?: string
  nextNote?: string
  photoPath?: string
}

export interface UpdateCookingLogInput {
  cookedAt?: string
  result?: CookingResult
  note?: string
  changes?: string
  nextNote?: string
  photoPath?: string
}

