<script setup lang="ts">
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

    <div v-if="state === 'empty'" class="upload-box empty-upload">
      <div class="upload-thumb"></div>
      <div>
        <strong>还没有选择照片</strong>
        <p class="muted">第一版只保存一张图，后面可以更换或删除。</p>
        <button class="secondary-action small-action" type="button" @click="$emit('choose')">选择一张图</button>
      </div>
    </div>

    <div v-else-if="state === 'uploading'" class="upload-box">
      <div class="upload-thumb"></div>
      <div>
        <strong>正在压缩并上传照片</strong>
        <p class="muted">{{ fileName || 'photo.webp' }} · {{ progress }}%</p>
        <div class="progress" aria-label="上传进度">
          <span :style="{ width: `${progress}%` }"></span>
        </div>
      </div>
    </div>

    <div v-else-if="state === 'uploaded'" class="upload-box">
      <div class="upload-thumb has-image"></div>
      <div>
        <strong>照片已上传</strong>
        <p class="muted">{{ fileName || 'photo.webp' }} · 已保存到本地状态</p>
        <div class="inline-actions">
          <button data-test="replace-image" class="secondary-action small-action" type="button" @click="$emit('replace')">
            更换
          </button>
          <button data-test="delete-image" class="secondary-action small-action" type="button" @click="$emit('delete')">
            删除
          </button>
        </div>
      </div>
    </div>

    <div v-else class="upload-box">
      <div class="upload-thumb"></div>
      <div>
        <strong>上传失败</strong>
        <p class="muted">{{ fileName || 'photo.webp' }} · 照片还没有保存。</p>
        <div class="inline-actions">
          <button data-test="retry-image" class="secondary-action small-action" type="button" @click="$emit('retry')">
            重试
          </button>
          <button data-test="remove-image" class="secondary-action small-action" type="button" @click="$emit('remove')">
            移除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

