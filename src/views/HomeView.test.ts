import { RouterLinkStub, flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import HomeView from './HomeView.vue'

describe('HomeView', () => {
  it('shows recent cooking logs and want-to-make recipes from repositories', async () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('最近做过')
    expect(wrapper.text()).toContain('番茄炒蛋')
    expect(wrapper.text()).toContain('这次糖少放')
    expect(wrapper.text()).toContain('想做')
    expect(wrapper.text()).toContain('照烧鸡腿饭')
  })
})
