import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import SingleImageUpload from './SingleImageUpload.vue'

describe('SingleImageUpload', () => {
  it('shows empty state for one optional image', () => {
    const wrapper = mount(SingleImageUpload, {
      props: {
        label: '封面图',
      },
    })

    expect(wrapper.text()).toContain('封面图')
    expect(wrapper.text()).toContain('最多 1 张')
    expect(wrapper.text()).toContain('选择一张图')
  })

  it('shows uploading state', () => {
    const wrapper = mount(SingleImageUpload, {
      props: {
        label: '成品照片',
        state: 'uploading',
        fileName: 'dish.webp',
        progress: 64,
      },
    })

    expect(wrapper.text()).toContain('正在压缩并上传照片')
    expect(wrapper.text()).toContain('64%')
  })

  it('shows uploaded state and emits replace/delete actions', async () => {
    const wrapper = mount(SingleImageUpload, {
      props: {
        label: '封面图',
        state: 'uploaded',
        fileName: 'cover.webp',
      },
    })

    expect(wrapper.text()).toContain('照片已上传')
    expect(wrapper.text()).toContain('cover.webp')

    await wrapper.get('[data-test="replace-image"]').trigger('click')
    await wrapper.get('[data-test="delete-image"]').trigger('click')

    expect(wrapper.emitted('replace')).toHaveLength(1)
    expect(wrapper.emitted('delete')).toHaveLength(1)
  })

  it('shows failed state and emits retry/remove actions', async () => {
    const wrapper = mount(SingleImageUpload, {
      props: {
        label: '成品照片',
        state: 'failed',
        fileName: 'dish.webp',
      },
    })

    expect(wrapper.text()).toContain('上传失败')

    await wrapper.get('[data-test="retry-image"]').trigger('click')
    await wrapper.get('[data-test="remove-image"]').trigger('click')

    expect(wrapper.emitted('retry')).toHaveLength(1)
    expect(wrapper.emitted('remove')).toHaveLength(1)
  })
})

