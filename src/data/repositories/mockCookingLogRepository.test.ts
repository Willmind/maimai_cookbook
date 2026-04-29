import { describe, expect, it } from 'vitest'

import { createMockCookingLogRepository } from './mockCookingLogRepository'

describe('mock cooking log repository', () => {
  it('rejects a cooking log without a recipe id', async () => {
    const repository = createMockCookingLogRepository([])

    await expect(repository.create({ recipeId: '' })).rejects.toThrow('recipeId is required')
  })

  it('updates an existing cooking log', async () => {
    const repository = createMockCookingLogRepository([])
    const created = await repository.create({ recipeId: 'recipe-1', note: '原始记录' })

    const updated = await repository.update(created.id, { note: '更新后的记录', result: 'good' })

    expect(updated.note).toBe('更新后的记录')
    expect(updated.result).toBe('good')
  })
})

