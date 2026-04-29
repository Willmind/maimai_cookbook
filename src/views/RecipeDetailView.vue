<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { cookingLogRepository, recipeRepository } from '@/data/repositories'
import { getPublicImageUrl } from '@/data/supabase/imageStorage'
import type { CookingLog } from '@/types/cooking-log'
import type { Recipe } from '@/types/recipe'

const props = defineProps<{
  id: string
}>()

const recipe = ref<Recipe>()
const cookingLogs = ref<CookingLog[]>([])

const sortedLogs = computed(() => [...cookingLogs.value].sort((a, b) => b.cookedAt.localeCompare(a.cookedAt)))
const coverImageUrl = computed(() => getPublicImageUrl('recipe-covers', recipe.value?.coverImagePath))

const familiarityLabel = computed(() => {
  if (recipe.value?.familiarity === 'frequent') return '常做'
  if (recipe.value?.familiarity === 'done') return '做过'
  return '没做过'
})

const resultLabel = (log: CookingLog) => {
  if (log.result === 'good') return '好吃'
  if (log.result === 'ok') return '一般'
  if (log.result === 'failed') return '翻车'
  return '未评价'
}

const resultTone = (log: CookingLog) => {
  if (log.result === 'good') return 'success'
  if (log.result === 'ok') return 'warning'
  if (log.result === 'failed') return 'danger'
  return 'neutral'
}

onMounted(async () => {
  const [recipeDetail, logs] = await Promise.all([
    recipeRepository.getById(props.id),
    cookingLogRepository.listByRecipeId(props.id),
  ])

  recipe.value = recipeDetail
  cookingLogs.value = logs
})
</script>

<template>
  <section v-if="recipe" class="detail-page">
    <div class="screen detail-hero">
      <div class="hero-photo" :class="{ 'has-image': coverImageUrl }">
        <img v-if="coverImageUrl" :src="coverImageUrl" alt="" />
      </div>
      <div class="detail-copy">
        <p class="eyebrow">菜谱档案</p>
        <h1>{{ recipe.name }}</h1>
        <p class="lead">{{ recipe.description ?? '还没有简介，等做几次后慢慢补。' }}</p>
        <p v-if="recipe.source" class="muted">来源 / 灵感：{{ recipe.source }}</p>

        <div class="detail-actions">
          <RouterLink class="primary-action" :to="`/recipes/${recipe.id}/logs/new`">记一次</RouterLink>
          <RouterLink class="secondary-action" :to="`/recipes/${recipe.id}/edit`">编辑菜谱</RouterLink>
        </div>

        <div class="tags">
          <span class="tag">{{ familiarityLabel }}</span>
          <span v-if="recipe.wantToMake" class="tag">已想做</span>
          <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>

    <div v-if="recipe.nextNote" class="note-band"><strong>下次注意：</strong>{{ recipe.nextNote }}</div>

    <div class="detail-grid">
      <article class="screen">
        <h2>食材</h2>
        <p class="multiline">{{ recipe.ingredients ?? '还没有记录食材。' }}</p>
      </article>

      <article class="screen">
        <h2>做法</h2>
        <p class="multiline">{{ recipe.method ?? '还没有记录做法。' }}</p>
      </article>
    </div>

    <section class="screen">
      <div class="section-head">
        <div>
          <p class="eyebrow">历史复盘</p>
          <h2>做饭记录</h2>
        </div>
        <span class="counter">{{ sortedLogs.length }} 条</span>
      </div>

      <div class="timeline">
        <RouterLink v-for="log in sortedLogs" :key="log.id" class="timeline-card" :to="`/recipes/${recipe.id}/logs/${log.id}/edit`">
          <div class="timeline-entry" :class="{ 'has-photo': log.photoPath }">
            <div v-if="log.photoPath" class="timeline-photo">
              <img v-if="getPublicImageUrl('cooking-log-photos', log.photoPath)" :src="getPublicImageUrl('cooking-log-photos', log.photoPath)" alt="" />
            </div>
            <div>
              <div class="timeline-top">
                <span>{{ log.cookedAt }}</span>
                <span data-test="log-result-tag" class="tag" :class="`tone-${resultTone(log)}`">{{ resultLabel(log) }}</span>
              </div>
              <p>{{ log.note }}</p>
              <p v-if="log.nextNote"><strong>下次：</strong>{{ log.nextNote }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>
  </section>

  <section v-else class="screen">
    <p class="muted">没有找到这道菜。</p>
  </section>
</template>
