export type RecipeFamiliarity = 'new' | 'done' | 'frequent'

export interface Recipe {
  id: string
  name: string
  source?: string
  description?: string
  coverImagePath?: string
  ingredients?: string
  method?: string
  nextNote?: string
  familiarity: RecipeFamiliarity
  wantToMake: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface NewRecipeInput {
  name: string
  source?: string
  description?: string
  coverImagePath?: string
  ingredients?: string
  method?: string
  nextNote?: string
  familiarity?: RecipeFamiliarity
  wantToMake?: boolean
  tags?: string[]
}

