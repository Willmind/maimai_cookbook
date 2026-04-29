<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import SegmentedControl from '@/components/SegmentedControl.vue'
import PageLoadingOverlay from '@/components/PageLoadingOverlay.vue'
import SingleImageUpload, { type ImageUploadState } from '@/components/SingleImageUpload.vue'
import { cookingLogRepository, recipeRepository } from '@/data/repositories'
import { resolveDataSource } from '@/data/repositories/dataSource'
import { deleteImage, getPublicImageUrl, uploadImage } from '@/data/supabase/imageStorage'
import type { CookingLog } from '@/types/cooking-log'
import type { Recipe } from '@/types/recipe'

const props = defineProps<{
  id: string
  logId: string
}>()

const router = useRouter()

const loading = ref(true)
const recipe = ref<Recipe>()
const log = ref<CookingLog>()
const cookedAt = ref(new Date().toISOString().slice(0, 10))
const result = ref<'good' | 'ok' | 'failed' | ''>('')
const note = ref('')
const changes = ref('')
const nextNote = ref('')
const photoState = ref<ImageUploadState>('empty')
const photoFileName = ref('')
const photoPath = ref<string>()
const lastPhotoFile = ref<File>()

const recipeName = computed(() => recipe.value?.name ?? '')
const photoPreviewUrl = computed(() => getPublicImageUrl('cooking-log-photos', photoPath.value))

const applyLog = (value: CookingLog) => {
  log.value = value
  cookedAt.value = value.cookedAt
  result.value = value.result ?? ''
  note.value = value.note ?? ''
  changes.value = value.changes ?? ''
  nextNote.value = value.nextNote ?? ''
  photoPath.value = value.photoPath
  photoState.value = value.photoPath ? 'uploaded' : 'empty'
  photoFileName.value = value.photoPath ? value.photoPath.split('/').pop() ?? '' : ''
}

const uploadPhoto = async (file?: File) => {
  if (!file && resolveDataSource() === 'supabase') return

  if (file) {
    lastPhotoFile.value = file
  }

  const previousPath = photoPath.value
  photoState.value = 'uploading'
  photoFileName.value = file?.name ?? 'dish-demo.webp'

  try {
    const path = await uploadImage('cooking-log-photos', file, `cooking-logs/${props.id}`)
    photoPath.value = path
    photoState.value = 'uploaded'

    if (previousPath && previousPath !== path) {
      await deleteImage('cooking-log-photos', previousPath)
    }
  } catch {
    photoState.value = 'failed'
  }
}

const clearPhoto = async () => {
  await deleteImage('cooking-log-photos', photoPath.value)
  photoState.value = 'empty'
  photoFileName.value = ''
  photoPath.value = undefined
}

const savedPhotoPath = () => {
  return photoState.value === 'uploaded' ? photoPath.value : undefined
}

const saveLog = async () => {
  if (!log.value) return

  await cookingLogRepository.update(log.value.id, {
    cookedAt: cookedAt.value || undefined,
    result: result.value || undefined,
    note: note.value || undefined,
    changes: changes.value || undefined,
    nextNote: nextNote.value || undefined,
    photoPath: savedPhotoPath(),
  })

  await router.push(`/recipes/${props.id}`)
}

onMounted(async () => {
  try {
    const [foundRecipe, foundLog] = await Promise.all([
      recipeRepository.getById(props.id),
      cookingLogRepository.getById(props.logId),
    ])
    recipe.value = foundRecipe
    if (foundLog && foundLog.recipeId === props.id) {
      applyLog(foundLog)
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="screen form-page">
    <div class="section-head">
      <div>
        <p class="eyebrow">修订记录</p>
        <h1>编辑一次记录</h1>
      </div>
    </div>

    <PageLoadingOverlay v-if="loading" />

    <form v-else-if="recipe && log" class="form-grid" @submit.prevent="saveLog">
      <label class="field">
        <span>这次做的是 <small>对应菜谱，不可修改</small></span>
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
        :preview-url="photoPreviewUrl"
        :progress="64"
        @choose="uploadPhoto"
        @replace="uploadPhoto"
        @delete="clearPhoto"
        @retry="uploadPhoto(lastPhotoFile)"
        @remove="clearPhoto"
      />

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

      <button class="primary-action submit-action" type="submit">保存修改</button>
    </form>

    <p v-else class="muted">没有找到这条记录，暂时不能编辑。</p>
  </section>
</template>
