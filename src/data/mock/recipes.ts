import type { Recipe } from '@/types/recipe'

export const mockRecipes: Recipe[] = [
  {
    id: 'recipe-tomato-eggs',
    name: '番茄炒蛋',
    source: '妈妈的做法，也参考过小红书收藏',
    description: '家里最常做的版本，偏清爽，适合配米饭。目标是番茄汁浓、鸡蛋嫩。',
    ingredients: '番茄 2 个\n鸡蛋 3 个\n葱花少许',
    method: '鸡蛋先炒到刚凝固，盛出。\n番茄下锅煮出汁，再放鸡蛋回锅。\n最后调盐，撒葱花。',
    nextNote: '番茄切小一点更容易出汁。糖少放，盐最后调。',
    familiarity: 'frequent',
    wantToMake: true,
    tags: ['家常', '快手', '下饭'],
    createdAt: '2026-04-10T10:00:00.000Z',
    updatedAt: '2026-04-27T10:00:00.000Z',
  },
  {
    id: 'recipe-scallion-noodles',
    name: '葱油拌面',
    ingredients: '面条\n小葱\n生抽\n老抽',
    method: '小葱慢慢煸香，调好酱汁后拌面。',
    nextNote: '葱要再煸久一点，香味会更稳。',
    familiarity: 'frequent',
    wantToMake: false,
    tags: ['快手'],
    createdAt: '2026-04-11T10:00:00.000Z',
    updatedAt: '2026-04-25T10:00:00.000Z',
  },
  {
    id: 'recipe-teriyaki-chicken',
    name: '照烧鸡腿饭',
    description: '适合晚饭，还没有做过。',
    familiarity: 'new',
    wantToMake: true,
    tags: ['家常', '晚饭'],
    createdAt: '2026-04-20T10:00:00.000Z',
    updatedAt: '2026-04-20T10:00:00.000Z',
  },
]

