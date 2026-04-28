export const RECIPE_TAGS = ['家常', '快手', '下饭', '早餐', '招待', '清淡', '汤', '晚饭'] as const

export type RecipeTag = (typeof RECIPE_TAGS)[number]

