import { RouterLinkStub, flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import RecipeDetailView from './RecipeDetailView.vue'

describe('RecipeDetailView', () => {
  it('shows recipe details and linked cooking logs', async () => {
    const wrapper = mount(RecipeDetailView, {
      props: {
        id: 'recipe-tomato-eggs',
      },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('番茄炒蛋')
    expect(wrapper.text()).toContain('妈妈的做法')
    expect(wrapper.text()).toContain('家里最常做的版本')
    expect(wrapper.text()).toContain('做饭记录')
    expect(wrapper.text()).toContain('2026-04-26')
    expect(wrapper.text()).toContain('这次糖少放')
  })
})
