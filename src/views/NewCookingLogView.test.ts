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

  it('shows one-image cooking photo upload states', async () => {
    const wrapper = mount(NewCookingLogView, {
      props: {
        id: 'recipe-tomato-eggs',
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('成品照片')
    expect(wrapper.text()).toContain('最多 1 张')

    await wrapper.get('.secondary-action').trigger('click')
    expect(wrapper.text()).toContain('照片已上传')

    await wrapper.get('[data-test="delete-image"]').trigger('click')
    expect(wrapper.text()).toContain('还没有选择照片')
  })
})
