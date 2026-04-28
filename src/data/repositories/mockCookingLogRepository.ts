import type { CookingLog, NewCookingLogInput } from '@/types/cooking-log'

import type { CookingLogRepository } from './cookingLogRepository'

const todayIsoDate = () => new Date().toISOString().slice(0, 10)

export function createMockCookingLogRepository(initialLogs: CookingLog[]): CookingLogRepository {
  const logs = [...initialLogs]

  return {
    async list() {
      return [...logs]
    },

    async listByRecipeId(recipeId) {
      return logs.filter((log) => log.recipeId === recipeId)
    },

    async create(input: NewCookingLogInput) {
      if (!input.recipeId.trim()) {
        throw new Error('recipeId is required')
      }

      const log: CookingLog = {
        id: `log-${crypto.randomUUID()}`,
        recipeId: input.recipeId,
        cookedAt: input.cookedAt ?? todayIsoDate(),
        result: input.result,
        note: input.note,
        changes: input.changes,
        nextNote: input.nextNote,
        photoPath: input.photoPath,
        createdAt: new Date().toISOString(),
      }

      logs.push(log)
      return log
    },
  }
}

