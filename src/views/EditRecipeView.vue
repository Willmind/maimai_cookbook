<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import SegmentedControl from '@/components/SegmentedControl.vue'
import PageLoadingOverlay from '@/components/PageLoadingOverlay.vue'
import SingleImageUpload, { type ImageUploadState } from '@/components/SingleImageUpload.vue'
import { recipeRepository } from '@/data/repositories'
import { resolveDataSource } from '@/data/repositories/dataSource'
import { deleteImage, getPublicImageUrl, uploadImage } from '@/data/supabase/imageStorage'
import { RECIPE_FIELD_LIMITS } from '@/features/recipes/fieldLimits'
import type { Recipe, RecipeFamiliarity } from '@/types/recipe'

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const loading = ref(true)
const recipe = ref<Recipe>()
const name = ref('')
const source = ref('')
const description = ref('')
const ingredients = ref('')
const method = ref('')
const nextNote = ref('')
const familiarity = ref<RecipeFamiliarity>('new')
const wantToMake = ref(true)
const error = ref('')
const coverImageState = ref<ImageUploadState>('empty')
const coverImageFileName = ref('')
const coverImagePath = ref<string>()
const lastCoverFile = ref<File>()

const coverImagePreviewUrl = computed(() => getPublicImageUrl('recipe-covers', coverImagePath.value))

const wantToMakeChoice = computed({
  get: () => (wantToMake.value ? 'yes' : 'no'),
  set: (value: string) => {
    wantToMake.value = value === 'yes'
  },
})

const applyRecipe = (value: Recipe) => {
  recipe.value = value
  name.value = value.name
  source.value = value.source ?? ''
  description.value = value.description ?? ''
  ingredients.value = value.ingredients ?? ''
  method.value = value.method ?? ''
  nextNote.value = value.nextNote ?? ''
  familiarity.value = value.familiarity
  wantToMake.value = value.wantToMake
  coverImagePath.value = value.coverImagePath
  coverImageState.value = value.coverImagePath ? 'uploaded' : 'empty'
  coverImageFileName.value = value.coverImagePath ? value.coverImagePath.split('/').pop() ?? '' : ''
}

const uploadCoverImage = async (file?: File) => {
  if (!file && resolveDataSource() === 'supabase') return

  if (file) {
    lastCoverFile.value = file
  }

  const previousPath = coverImagePath.value
  coverImageState.value = 'uploading'
  coverImageFileName.value = file?.name ?? 'cover-demo.webp'

  try {
    const path = await uploadImage('recipe-covers', file, `recipes/${props.id}`)
    coverImagePath.value = path
    coverImageState.value = 'uploaded'

    if (previousPath && previousPath !== path) {
      await deleteImage('recipe-covers', previousPath)
    }
  } catch {
    coverImageState.value = 'failed'
  }
}

const clearCoverImage = async () => {
  await deleteImage('recipe-covers', coverImagePath.value)
  coverImageState.value = 'empty'
  coverImageFileName.value = ''
  coverImagePath.value = undefined
}

const savedCoverImagePath = () => {
  return coverImageState.value === 'uploaded' ? coverImagePath.value : undefined
}

const saveRecipe = async () => {
  if (!recipe.value) return
  error.value = ''

  if (!name.value.trim()) {
    error.value = '菜名必填'
    return
  }

  await recipeRepository.update(recipe.value.id, {
    name: name.value,
    source: source.value || undefined,
    description: description.value || undefined,
    coverImagePath: savedCoverImagePath(),
    ingredients: ingredients.value || undefined,
    method: method.value || undefined,
    nextNote: nextNote.value || undefined,
    wantToMake: wantToMake.value,
    familiarity: familiarity.value,
    tags: recipe.value.tags,
  })

  await router.push(`/recipes/${recipe.value.id}`)
}

const cancel = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }
  router.push(`/recipes/${props.id}`)
}

onMounted(async () => {
  try {
    const found = await recipeRepository.getById(props.id)
    if (found) {
      applyRecipe(found)
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
        <p class="eyebrow">更新菜谱</p>
        <h1>编辑菜谱</h1>
      </div>
    </div>

    <PageLoadingOverlay v-if="loading" />

    <form v-else-if="recipe" class="form-grid" @submit.prevent="saveRecipe">
      <label class="field">
        <span>菜名 <small>必填 · {{ name.length }}/{{ RECIPE_FIELD_LIMITS.name }}</small></span>
        <input v-model="name" data-test="recipe-name" :maxlength="RECIPE_FIELD_LIMITS.name" placeholder="例如：番茄炒蛋" />
      </label>

      <label class="field">
        <span>来源 / 灵感 <small>可选 · {{ source.length }}/{{ RECIPE_FIELD_LIMITS.source }}</small></span>
        <input v-model="source" :maxlength="RECIPE_FIELD_LIMITS.source" placeholder="妈妈的做法、收藏笔记、餐厅灵感..." />
      </label>

      <label class="field">
        <span>简介 <small>可选 · {{ description.length }}/{{ RECIPE_FIELD_LIMITS.description }}</small></span>
        <textarea
          v-model="description"
          :maxlength="RECIPE_FIELD_LIMITS.description"
          rows="3"
          placeholder="这道菜适合什么时候做？目标口味是什么？"
        ></textarea>
      </label>

      <SingleImageUpload
        label="封面图"
        :state="coverImageState"
        :file-name="coverImageFileName"
        :preview-url="coverImagePreviewUrl"
        :progress="64"
        @choose="uploadCoverImage"
        @replace="uploadCoverImage"
        @delete="clearCoverImage"
        @retry="uploadCoverImage(lastCoverFile)"
        @remove="clearCoverImage"
      />

      <label class="field">
        <span>食材 <small>可选，每行一项 · {{ ingredients.length }}/{{ RECIPE_FIELD_LIMITS.ingredients }}</small></span>
        <textarea
          v-model="ingredients"
          :maxlength="RECIPE_FIELD_LIMITS.ingredients"
          rows="4"
          placeholder="番茄 2 个&#10;鸡蛋 3 个"
        ></textarea>
      </label>

      <label class="field">
        <span>做法 <small>可选 · {{ method.length }}/{{ RECIPE_FIELD_LIMITS.method }}</small></span>
        <textarea v-model="method" :maxlength="RECIPE_FIELD_LIMITS.method" rows="5" placeholder="写成自己下次看得懂的版本"></textarea>
      </label>

      <label class="field">
        <span>小贴士 / 下次注意 <small>可选 · {{ nextNote.length }}/{{ RECIPE_FIELD_LIMITS.nextNote }}</small></span>
        <textarea
          v-model="nextNote"
          :maxlength="RECIPE_FIELD_LIMITS.nextNote"
          rows="3"
          placeholder="下次想提醒自己的地方"
        ></textarea>
      </label>

      <SegmentedControl
        v-model="familiarity"
        label="熟悉度"
        :options="[
          { value: 'new', label: '没做过', testId: 'recipe-familiarity-new', tone: 'neutral' },
          { value: 'done', label: '做过', testId: 'recipe-familiarity-done', tone: 'warning' },
          { value: 'frequent', label: '常做', testId: 'recipe-familiarity-frequent', tone: 'success' },
        ]"
      />

      <SegmentedControl
        v-model="wantToMakeChoice"
        label="是否加入想做清单"
        :options="[
          { value: 'yes', label: '加入想做', testId: 'recipe-want-yes', tone: 'selected' },
          { value: 'no', label: '暂时不加', testId: 'recipe-want-no', tone: 'neutral' },
        ]"
      />

      <p v-if="error" class="error-note">{{ error }}</p>

      <div class="inline-actions">
        <button class="secondary-action" type="button" @click="cancel">取消</button>
        <button class="primary-action submit-action" type="submit">保存修改</button>
      </div>
    </form>

    <p v-else class="muted">没有找到这道菜，暂时不能编辑。</p>
  </section>
</template>
