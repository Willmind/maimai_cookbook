import type { CookingLog, NewCookingLogInput, UpdateCookingLogInput } from '@/types/cooking-log'

import type { CookingLogRepository } from './cookingLogRepository'

const todayIsoDate = () => new Date().toISOString().slice(0, 10)

export function createMockCookingLogRepository(initialLogs: CookingLog[]): CookingLogRepository {
  const logs = [...initialLogs]

  return {
    async list() {
      return [...logs]
    },

    async getById(id) {
      return logs.find((log) => log.id === id)
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

    async update(id: string, input: UpdateCookingLogInput) {
      const index = logs.findIndex((log) => log.id === id)
      if (index < 0) {
        throw new Error('cooking log not found')
      }

      const nextLog: CookingLog = {
        ...logs[index],
        cookedAt: input.cookedAt ?? logs[index].cookedAt,
        result: input.result,
        note: input.note,
        changes: input.changes,
        nextNote: input.nextNote,
        photoPath: input.photoPath,
      }

      logs[index] = nextLog
      return nextLog
    },
  }
}

