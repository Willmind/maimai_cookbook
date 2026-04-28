import { RouterLinkStub, flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AllRecipesView from './AllRecipesView.vue'

describe('AllRecipesView', () => {
  it('shows all recipe filters and recipe cards from repositories', async () => {
    const wrapper = mount(AllRecipesView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('全部菜谱')
    expect(wrapper.text()).toContain('没做过')
    expect(wrapper.text()).toContain('做过')
    expect(wrapper.text()).toContain('常做')
    expect(wrapper.text()).toContain('番茄炒蛋')
    expect(wrapper.text()).toContain('葱油拌面')
    expect(wrapper.text()).toContain('照烧鸡腿饭')
  })
})
