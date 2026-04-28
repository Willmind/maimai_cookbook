import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { cookingLogRepository } from '@/data/repositories'

import NewCookingLogView from './NewCookingLogView.vue'

const push = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}))

describe('NewCookingLogView', () => {
  beforeEach(() => {
    push.mockReset()
  })

  it('shows readonly recipe name and creates a cooking log for that recipe', async () => {
    const wrapper = mount(NewCookingLogView, {
      props: {
        id: 'recipe-tomato-eggs',
      },
    })

    await flushPromises()

    const recipeName = wrapper.get<HTMLInputElement>('[data-test="log-recipe-name"]')
    expect(recipeName.element.value).toBe('番茄炒蛋')
    expect(recipeName.attributes('readonly')).toBeDefined()

    await wrapper.get('[data-test="log-note"]').setValue('这次番茄汁更浓。')
    await wrapper.get('form').trigger('submit.prevent')

    const logs = await cookingLogRepository.listByRecipeId('recipe-tomato-eggs')

    expect(logs.some((log) => log.note === '这次番茄汁更浓。')).toBe(true)
    expect(push).toHaveBeenCalledWith('/recipes/recipe-tomato-eggs')
  })
})

