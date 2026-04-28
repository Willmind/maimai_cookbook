import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { recipeRepository } from '@/data/repositories'

import NewRecipeView from './NewRecipeView.vue'

const push = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}))

describe('NewRecipeView', () => {
  beforeEach(() => {
    push.mockReset()
  })

  it('creates a recipe with only name and navigates to detail', async () => {
    const wrapper = mount(NewRecipeView)

    await wrapper.get('[data-test="recipe-name"]').setValue('蒜香口蘑')
    await wrapper.get('form').trigger('submit.prevent')

    const created = await recipeRepository.list()
    const recipe = created.find((item) => item.name === '蒜香口蘑')

    expect(recipe?.wantToMake).toBe(true)
    expect(recipe?.familiarity).toBe('new')
    expect(push).toHaveBeenCalledWith(`/recipes/${recipe?.id}`)
  })

  it('shows a validation message when name is empty', async () => {
    const wrapper = mount(NewRecipeView)

    await wrapper.get('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('菜名必填')
    expect(push).not.toHaveBeenCalled()
  })

  it('shows one-image cover upload states', async () => {
    const wrapper = mount(NewRecipeView)

    expect(wrapper.text()).toContain('封面图')
    expect(wrapper.text()).toContain('最多 1 张')

    await wrapper.get('.secondary-action').trigger('click')
    expect(wrapper.text()).toContain('照片已上传')

    await wrapper.get('[data-test="delete-image"]').trigger('click')
    expect(wrapper.text()).toContain('还没有选择照片')
  })
})
