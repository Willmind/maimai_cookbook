import type { CookingLog } from '@/types/cooking-log'

export const mockCookingLogs: CookingLog[] = [
  {
    id: 'log-tomato-eggs-2026-04-26',
    recipeId: 'recipe-tomato-eggs',
    cookedAt: '2026-04-26',
    result: 'good',
    note: '这次糖少放，更清爽。番茄汁还可以再浓一点。',
    nextNote: '番茄切小，先多煮 1 分钟。',
    photoPath: 'mock/tomato-eggs-0426.webp',
    createdAt: '2026-04-26T12:00:00.000Z',
  },
  {
    id: 'log-tomato-eggs-2026-04-12',
    recipeId: 'recipe-tomato-eggs',
    cookedAt: '2026-04-12',
    result: 'ok',
    note: '鸡蛋炒老了，番茄块也太大，味道有点散。',
    nextNote: '鸡蛋提前盛出，不要一直在锅里煮。',
    createdAt: '2026-04-12T12:00:00.000Z',
  },
  {
    id: 'log-scallion-noodles-2026-04-25',
    recipeId: 'recipe-scallion-noodles',
    cookedAt: '2026-04-25',
    result: 'good',
    note: '葱油香，但葱还可以煸久一点。',
    nextNote: '下次火再小一点。',
    createdAt: '2026-04-25T12:00:00.000Z',
  },
]

