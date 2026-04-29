import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { cookingLogRepository } from '@/data/repositories'

import EditCookingLogView from './EditCookingLogView.vue'

const push = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}))

describe('EditCookingLogView', () => {
  beforeEach(() => {
    push.mockReset()
  })

  it('loads existing cooking log and saves edits', async () => {
    const wrapper = mount(EditCookingLogView, {
      props: {
        id: 'recipe-tomato-eggs',
        logId: 'log-tomato-eggs-2026-04-26',
      },
    })

    await flushPromises()

    await wrapper.get('[data-test="log-note"]').setValue('这次改成编辑内容')
    await wrapper.get('form').trigger('submit.prevent')

    const updated = await cookingLogRepository.getById('log-tomato-eggs-2026-04-26')
    expect(updated?.note).toBe('这次改成编辑内容')
    expect(push).toHaveBeenCalledWith('/recipes/recipe-tomato-eggs')
  })
})
