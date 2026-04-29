import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { recipeRepository } from '@/data/repositories'

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
})
