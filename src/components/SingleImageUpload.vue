<script setup lang="ts">
import iconDeleteUrl from '@/assets/icons/icon-delete.svg?url'
import iconRefreshUrl from '@/assets/icons/icon-refresh.svg?url'

export type ImageUploadState = 'empty' | 'uploading' | 'uploaded' | 'failed'

withDefaults(
  defineProps<{
    label: string
    state?: ImageUploadState
    fileName?: string
    progress?: number
  }>(),
  {
    state: 'empty',
    fileName: '',
    progress: 0,
  },
)

defineEmits<{
  choose: []
  replace: []
  delete: []
  retry: []
  remove: []
}>()
</script>

<template>
  <div class="upload-field">
    <div class="field-label">
      <span>{{ label }}</span>
      <small>可选，最多 1 张</small>
    </div>

    <div class="polaroid" :class="`is-${state}`">
      <button
        v-if="state === 'empty'"
        data-test="choose-image"
        class="polaroid-main"
        type="button"
        aria-label="添加照片"
        @click="$emit('choose')"
      >
        <span class="polaroid-plus" aria-hidden="true">＋</span>
      </button>

      <div v-else class="polaroid-main" aria-label="照片预览">
        <div class="polaroid-photo" :class="{ 'has-image': state === 'uploaded' }"></div>

        <div
          v-if="state === 'uploading'"
          data-test="upload-progress"
          class="polaroid-progress"
          role="progressbar"
          aria-label="上传进度"
          :aria-valuemin="0"
          :aria-valuemax="100"
          :aria-valuenow="progress"
        >
          <span class="sr-only">{{ progress }}%</span>
          <span :style="{ width: `${progress}%` }"></span>
        </div>

        <div v-else-if="state === 'failed'" class="polaroid-failed">
          <button data-test="retry-image" class="secondary-action small-action" type="button" @click="$emit('retry')">重试</button>
          <button data-test="remove-image" class="secondary-action small-action" type="button" @click="$emit('remove')">移除</button>
        </div>

        <div v-else class="polaroid-corner-actions" :title="fileName || ''" :aria-label="fileName || ''">
          <button
            data-test="replace-image"
            class="icon-button"
            type="button"
            aria-label="更换照片"
            title="更换"
            @click="$emit('replace')"
          >
            <img :src="iconRefreshUrl" alt="" draggable="false" />
          </button>
          <button
            data-test="delete-image"
            class="icon-button"
            type="button"
            aria-label="删除照片"
            title="删除"
            @click="$emit('delete')"
          >
            <img :src="iconDeleteUrl" alt="" draggable="false" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

