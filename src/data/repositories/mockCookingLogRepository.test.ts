import { describe, expect, it } from 'vitest'

import { createMockCookingLogRepository } from './mockCookingLogRepository'

describe('mock cooking log repository', () => {
  it('rejects a cooking log without a recipe id', async () => {
    const repository = createMockCookingLogRepository([])

    await expect(repository.create({ recipeId: '' })).rejects.toThrow('recipeId is required')
  })
})

