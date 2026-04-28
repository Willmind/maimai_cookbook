<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import SegmentedControl from '@/components/SegmentedControl.vue'
import SingleImageUpload, { type ImageUploadState } from '@/components/SingleImageUpload.vue'
import { cookingLogRepository, recipeRepository } from '@/data/repositories'
import type { Recipe } from '@/types/recipe'

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const recipe = ref<Recipe>()
const cookedAt = ref(new Date().toISOString().slice(0, 10))
const result = ref<'good' | 'ok' | 'failed' | ''>('')
const note = ref('')
const changes = ref('')
const nextNote = ref('')
const photoState = ref<ImageUploadState>('empty')
const photoFileName = ref('')

const recipeName = computed(() => recipe.value?.name ?? '')

const markPhotoUploaded = () => {
  photoState.value = 'uploaded'
  photoFileName.value = 'dish-demo.webp'
}

const markPhotoFailed = () => {
  photoState.value = 'failed'
  photoFileName.value = 'dish-demo.webp'
}

const clearPhoto = () => {
  photoState.value = 'empty'
  photoFileName.value = ''
}

const saveLog = async () => {
  await cookingLogRepository.create({
    recipeId: props.id,
    cookedAt: cookedAt.value || undefined,
    result: result.value || undefined,
    note: note.value || undefined,
    changes: changes.value || undefined,
    nextNote: nextNote.value || undefined,
  })

  await router.push(`/recipes/${props.id}`)
}

onMounted(async () => {
  recipe.value = await recipeRepository.getById(props.id)
})
</script>

<template>
  <section class="screen form-page">
    <div class="section-head">
      <div>
        <p class="eyebrow">厨房日记</p>
        <h1>记录一次</h1>
      </div>
    </div>

    <form v-if="recipe" class="form-grid" @submit.prevent="saveLog">
      <label class="field">
        <span>这次做的是 <small>从菜谱详情带入，不可修改</small></span>
        <input data-test="log-recipe-name" :value="recipeName" readonly />
      </label>

      <label class="field">
        <span>日期 <small>可选，默认今天</small></span>
        <input v-model="cookedAt" type="date" />
      </label>

      <SegmentedControl
        v-model="result"
        label="这次做得怎么样？"
        :options="[
          { value: '', label: '不评价', testId: 'log-result-none', tone: 'neutral' },
          { value: 'good', label: '好吃', testId: 'log-result-good', tone: 'success' },
          { value: 'ok', label: '一般', testId: 'log-result-ok', tone: 'warning' },
          { value: 'failed', label: '翻车', testId: 'log-result-failed', tone: 'danger' },
        ]"
      />

      <SingleImageUpload
        label="成品照片"
        :state="photoState"
        :file-name="photoFileName"
        :progress="64"
        @choose="markPhotoUploaded"
        @replace="markPhotoUploaded"
        @delete="clearPhoto"
        @retry="markPhotoUploaded"
        @remove="clearPhoto"
      />

      <button class="ghost-action" type="button" @click="markPhotoFailed">模拟上传失败</button>

      <label class="field">
        <span>这次记录 <small>可选</small></span>
        <textarea v-model="note" data-test="log-note" rows="4" placeholder="这次有什么值得记住？"></textarea>
      </label>

      <label class="field">
        <span>和上次比改了什么？ <small>可选</small></span>
        <textarea v-model="changes" rows="3" placeholder="糖少放、火更小、顺序改了..."></textarea>
      </label>

      <label class="field">
        <span>下次要注意什么？ <small>可选</small></span>
        <textarea v-model="nextNote" rows="3" placeholder="给下一次下厨的自己留一句话"></textarea>
      </label>

      <button class="primary-action submit-action" type="submit">保存这次记录</button>
    </form>

    <p v-else class="muted">没有找到这道菜，暂时不能记录一次。</p>
  </section>
</template>
