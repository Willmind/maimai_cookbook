<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import SingleImageUpload, { type ImageUploadState } from '@/components/SingleImageUpload.vue'
import { recipeRepository } from '@/data/repositories'
import { resolveDataSource } from '@/data/repositories/dataSource'
import { deleteImage, getPublicImageUrl, uploadImage } from '@/data/supabase/imageStorage'

const router = useRouter()

const name = ref('')
const source = ref('')
const description = ref('')
const ingredients = ref('')
const method = ref('')
const nextNote = ref('')
const wantToMake = ref(true)
const error = ref('')
const coverImageState = ref<ImageUploadState>('empty')
const coverImageFileName = ref('')
const coverImagePath = ref<string>()
const lastCoverFile = ref<File>()

const coverImagePreviewUrl = computed(() => getPublicImageUrl('recipe-covers', coverImagePath.value))

const uploadCoverImage = async (file?: File) => {
  if (!file && resolveDataSource() === 'supabase') return

  if (file) {
    lastCoverFile.value = file
  }

  const previousPath = coverImagePath.value
  coverImageState.value = 'uploading'
  coverImageFileName.value = file?.name ?? 'cover-demo.webp'

  try {
    const path = await uploadImage('recipe-covers', file, 'recipes/draft')
    coverImagePath.value = path
    coverImageState.value = 'uploaded'

    if (previousPath && previousPath !== path) {
      await deleteImage('recipe-covers', previousPath)
    }
  } catch {
    coverImageState.value = 'failed'
  }
}

const markCoverFailed = () => {
  coverImageState.value = 'failed'
  coverImageFileName.value = 'cover-demo.webp'
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
  error.value = ''

  if (!name.value.trim()) {
    error.value = '菜名必填'
    return
  }

  const recipe = await recipeRepository.create({
    name: name.value,
    source: source.value || undefined,
    description: description.value || undefined,
    coverImagePath: savedCoverImagePath(),
    ingredients: ingredients.value || undefined,
    method: method.value || undefined,
    nextNote: nextNote.value || undefined,
    wantToMake: wantToMake.value,
  })

  await router.push(`/recipes/${recipe.id}`)
}
</script>

<template>
  <section class="screen form-page">
    <div class="section-head">
      <div>
        <p class="eyebrow">建立菜谱档案</p>
        <h1>记一道菜</h1>
      </div>
    </div>

    <form class="form-grid" @submit.prevent="saveRecipe">
      <label class="field">
        <span>菜名 <small>必填</small></span>
        <input v-model="name" data-test="recipe-name" placeholder="例如：番茄炒蛋" />
      </label>

      <label class="field">
        <span>来源 / 灵感 <small>可选</small></span>
        <input v-model="source" placeholder="妈妈的做法、收藏笔记、餐厅灵感..." />
      </label>

      <label class="field">
        <span>简介 <small>可选</small></span>
        <textarea v-model="description" rows="3" placeholder="这道菜适合什么时候做？目标口味是什么？"></textarea>
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

      <button class="ghost-action" type="button" @click="markCoverFailed">模拟上传失败</button>

      <label class="field">
        <span>食材 <small>可选，每行一项</small></span>
        <textarea v-model="ingredients" rows="4" placeholder="番茄 2 个&#10;鸡蛋 3 个"></textarea>
      </label>

      <label class="field">
        <span>做法 <small>可选</small></span>
        <textarea v-model="method" rows="5" placeholder="写成自己下次看得懂的版本"></textarea>
      </label>

      <label class="field">
        <span>小贴士 / 下次注意 <small>可选</small></span>
        <textarea v-model="nextNote" rows="3" placeholder="下次想提醒自己的地方"></textarea>
      </label>

      <label class="toggle-line">
        <input v-model="wantToMake" type="checkbox" />
        <span>默认加入想做清单</span>
      </label>

      <p v-if="error" class="error-note">{{ error }}</p>

      <button class="primary-action submit-action" type="submit">保存这道菜</button>
    </form>
  </section>
</template>
