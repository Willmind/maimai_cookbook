<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { recipeRepository } from '@/data/repositories'
import { getPublicImageUrl } from '@/data/supabase/imageStorage'
import { filterRecipes, searchCookbook, type RecipeFilter } from '@/features/search/search'
import type { Recipe } from '@/types/recipe'

const recipes = ref<Recipe[]>([])
const searchKeyword = ref('')
const activeFilter = ref<RecipeFilter>('all')

const filterOptions: Array<{ key: RecipeFilter; label: string; testId: string }> = [
  { key: 'all', label: '全部', testId: 'filter-all' },
  { key: 'want', label: '想做', testId: 'filter-want' },
  { key: 'new', label: '没做过', testId: 'filter-new' },
  { key: 'done', label: '做过', testId: 'filter-done' },
  { key: 'frequent', label: '常做', testId: 'filter-frequent' },
]

const visibleRecipes = computed(() => {
  const searched = searchKeyword.value.trim()
    ? searchCookbook(searchKeyword.value, recipes.value, []).recipes
    : recipes.value

  return filterRecipes(searched, activeFilter.value).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
})

const familiarityLabel = (recipe: Recipe) => {
  if (recipe.familiarity === 'frequent') return '常做'
  if (recipe.familiarity === 'done') return '做过'
  return '没做过'
}

const recipeCoverUrl = (recipe: Recipe) => getPublicImageUrl('recipe-covers', recipe.coverImagePath)

onMounted(async () => {
  recipes.value = await recipeRepository.list()
})
</script>

<template>
  <section class="screen">
    <div class="section-head">
      <div>
        <p class="eyebrow">菜谱目录</p>
        <h1>全部菜谱</h1>
      </div>
      <span class="counter">{{ visibleRecipes.length }} 道</span>
    </div>

    <input v-model="searchKeyword" class="search-input" placeholder="搜索菜名、食材、标签或做法" />

    <div class="filter-row" aria-label="清单和熟悉度筛选">
      <button
        v-for="option in filterOptions"
        :key="option.key"
        class="filter-chip"
        :class="{ active: activeFilter === option.key }"
        :data-test="option.testId"
        type="button"
        @click="activeFilter = option.key"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="card-list recipe-directory">
      <RouterLink v-for="recipe in visibleRecipes" :key="recipe.id" class="recipe-card" :to="`/recipes/${recipe.id}`">
        <div class="photo-frame" :class="{ 'has-image': recipeCoverUrl(recipe) }">
          <img v-if="recipeCoverUrl(recipe)" :src="recipeCoverUrl(recipe)" alt="" />
        </div>
        <div>
          <h3>{{ recipe.name }}</h3>
          <p class="muted">
            {{ familiarityLabel(recipe) }}
            <span v-if="recipe.wantToMake"> · 想做</span>
            <span v-if="recipe.nextNote"> · {{ recipe.nextNote }}</span>
          </p>
          <div class="tags">
            <span class="tag">{{ familiarityLabel(recipe) }}</span>
            <span v-if="recipe.wantToMake" class="tag">想做</span>
            <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
