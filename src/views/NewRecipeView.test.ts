import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { recipeRepository } from '@/data/repositories'
import { RECIPE_FIELD_LIMITS } from '@/features/recipes/fieldLimits'

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

    await wrapper.get('[data-test="choose-image"]').trigger('click')

    await wrapper.get('[data-test="delete-image"]').trigger('click')
    expect(wrapper.get('[data-test="choose-image"]')).toBeDefined()
  })

  it('saves uploaded cover image path to mock recipe data', async () => {
    const wrapper = mount(NewRecipeView)

    await wrapper.get('[data-test="recipe-name"]').setValue('有封面的菜')
    await wrapper.get('[data-test="choose-image"]').trigger('click')
    await wrapper.get('form').trigger('submit.prevent')

    const recipes = await recipeRepository.list()
    const recipe = recipes.find((item) => item.name === '有封面的菜')

    expect(recipe?.coverImagePath).toBe('mock/cover-demo.webp')
  })

  it('creates recipe with selected familiarity', async () => {
    const wrapper = mount(NewRecipeView)

    await wrapper.get('[data-test="recipe-name"]').setValue('回锅肉')
    await wrapper.get('[data-test="recipe-familiarity-done"]').trigger('click')
    await wrapper.get('form').trigger('submit.prevent')

    const recipes = await recipeRepository.list()
    const recipe = recipes.find((item) => item.name === '回锅肉')

    expect(recipe?.familiarity).toBe('done')
  })

  it('applies field max length limits', async () => {
    const wrapper = mount(NewRecipeView)

    expect(wrapper.get('[data-test="recipe-name"]').attributes('maxlength')).toBe(String(RECIPE_FIELD_LIMITS.name))
    expect(wrapper.get('input[placeholder="妈妈的做法、收藏笔记、餐厅灵感..."]').attributes('maxlength')).toBe(String(RECIPE_FIELD_LIMITS.source))
    expect(wrapper.get('textarea[placeholder="这道菜适合什么时候做？目标口味是什么？"]').attributes('maxlength')).toBe(
      String(RECIPE_FIELD_LIMITS.description),
    )
    expect(wrapper.text()).toContain(`0/${RECIPE_FIELD_LIMITS.name}`)
  })
})
