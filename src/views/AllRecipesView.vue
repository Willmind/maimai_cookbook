<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { recipeRepository } from '@/data/repositories'
import type { Recipe } from '@/types/recipe'

const recipes = ref<Recipe[]>([])

const filterLabels = ['全部', '想做', '没做过', '做过', '常做']
const sortedRecipes = computed(() => [...recipes.value].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)))

const familiarityLabel = (recipe: Recipe) => {
  if (recipe.familiarity === 'frequent') return '常做'
  if (recipe.familiarity === 'done') return '做过'
  return '没做过'
}

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
      <span class="counter">{{ recipes.length }} 道</span>
    </div>

    <input class="search-input" placeholder="搜索菜名、食材、标签或做法" />

    <div class="filter-row" aria-label="清单和熟悉度筛选">
      <button
        v-for="(label, index) in filterLabels"
        :key="label"
        class="filter-chip"
        :class="{ active: index === 0 }"
        type="button"
      >
        {{ label }}
      </button>
    </div>

    <div class="card-list recipe-directory">
      <RouterLink v-for="recipe in sortedRecipes" :key="recipe.id" class="recipe-card" :to="`/recipes/${recipe.id}`">
        <div class="photo-frame"></div>
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
