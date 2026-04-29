import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { recipeRepository } from '@/data/repositories'
import { RECIPE_FIELD_LIMITS } from '@/features/recipes/fieldLimits'

import EditRecipeView from './EditRecipeView.vue'

const push = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}))

describe('EditRecipeView', () => {
  beforeEach(() => {
    push.mockReset()
  })

  it('loads existing recipe and saves edits', async () => {
    const wrapper = mount(EditRecipeView, {
      props: {
        id: 'recipe-tomato-eggs',
      },
    })

    await flushPromises()

    const nameInput = wrapper.get<HTMLInputElement>('[data-test="recipe-name"]')
    expect(nameInput.element.value).toBe('番茄炒蛋')

    await nameInput.setValue('番茄炒蛋（改）')
    await wrapper.get('form').trigger('submit.prevent')

    const updated = await recipeRepository.getById('recipe-tomato-eggs')
    expect(updated?.name).toBe('番茄炒蛋（改）')
    expect(push).toHaveBeenCalledWith('/recipes/recipe-tomato-eggs')
  })

  it('applies max length limits on edit fields', async () => {
    const wrapper = mount(EditRecipeView, {
      props: {
        id: 'recipe-tomato-eggs',
      },
    })

    await flushPromises()

    expect(wrapper.get('[data-test="recipe-name"]').attributes('maxlength')).toBe(String(RECIPE_FIELD_LIMITS.name))
    expect(wrapper.get('input[placeholder="妈妈的做法、收藏笔记、餐厅灵感..."]').attributes('maxlength')).toBe(String(RECIPE_FIELD_LIMITS.source))
    expect(wrapper.text()).toContain(`${'番茄炒蛋（改）'.length}/${RECIPE_FIELD_LIMITS.name}`)
  })

  it('allows editing familiarity and saves it', async () => {
    const wrapper = mount(EditRecipeView, {
      props: {
        id: 'recipe-tomato-eggs',
      },
    })

    await flushPromises()

    await wrapper.get('[data-test="recipe-familiarity-done"]').trigger('click')
    await wrapper.get('form').trigger('submit.prevent')

    const updated = await recipeRepository.getById('recipe-tomato-eggs')
    expect(updated?.familiarity).toBe('done')
  })
})
