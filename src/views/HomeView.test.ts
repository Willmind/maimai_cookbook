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

  it('shows grouped search results with recipes before cooking logs', async () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    await flushPromises()
    await wrapper.get('[data-test="home-search"]').setValue('番茄')

    expect(wrapper.text()).toContain('搜索结果')
    expect(wrapper.text()).toContain('菜谱')
    expect(wrapper.text()).toContain('做饭记录')
    expect(wrapper.text().indexOf('菜谱')).toBeLessThan(wrapper.text().indexOf('做饭记录'))
    expect(wrapper.text()).toContain('番茄炒蛋')
    expect(wrapper.text()).toContain('2026-04-26')
  })
})
