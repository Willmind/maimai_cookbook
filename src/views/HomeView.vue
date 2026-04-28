<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { cookingLogRepository, recipeRepository } from '@/data/repositories'
import { searchCookbook } from '@/features/search/search'
import type { CookingLog } from '@/types/cooking-log'
import type { Recipe } from '@/types/recipe'

const recipes = ref<Recipe[]>([])
const cookingLogs = ref<CookingLog[]>([])
const searchKeyword = ref('')

const recipeNameById = computed(() => {
  return new Map(recipes.value.map((recipe) => [recipe.id, recipe.name]))
})

const recentLogs = computed(() => {
  return [...cookingLogs.value]
    .sort((a, b) => b.cookedAt.localeCompare(a.cookedAt))
    .slice(0, 3)
    .map((log) => ({
      ...log,
      recipeName: recipeNameById.value.get(log.recipeId) ?? '未知菜谱',
    }))
})

const wantToMakeRecipes = computed(() => recipes.value.filter((recipe) => recipe.wantToMake).slice(0, 3))

const searchResult = computed(() => searchCookbook(searchKeyword.value, recipes.value, cookingLogs.value))
const hasSearchKeyword = computed(() => searchKeyword.value.trim().length > 0)

const recipeName = (recipeId: string) => recipeNameById.value.get(recipeId) ?? '未知菜谱'

onMounted(async () => {
  const [recipeList, logList] = await Promise.all([recipeRepository.list(), cookingLogRepository.list()])
  recipes.value = recipeList
  cookingLogs.value = logList
})
</script>

<template>
  <section class="home-layout">
    <div class="screen hero-card">
      <p class="eyebrow">我的厨房笔记</p>
      <h1>今天想找哪道菜？</h1>
      <p class="muted">先把菜谱、想做和最近做过放在手边，像翻一本自己的厨房手账。</p>
      <input v-model="searchKeyword" class="search-input" data-test="home-search" placeholder="试试 番茄、快手、下饭" />
    </div>

    <section v-if="hasSearchKeyword" class="screen">
      <div class="section-head">
        <div>
          <p class="eyebrow">搜索结果</p>
          <h2>先看菜谱，再看做饭记录</h2>
        </div>
      </div>

      <div class="search-groups">
        <div>
          <h3>菜谱</h3>
          <div class="card-list">
            <RouterLink
              v-for="recipe in searchResult.recipes"
              :key="recipe.id"
              class="recipe-card"
              :to="`/recipes/${recipe.id}`"
            >
              <div class="photo-frame"></div>
              <div>
                <h3>{{ recipe.name }}</h3>
                <p class="muted">{{ recipe.description ?? recipe.nextNote ?? '还没有补充说明。' }}</p>
                <div class="tags">
                  <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <div>
          <h3>做饭记录</h3>
          <div class="card-list">
            <RouterLink
              v-for="log in searchResult.logs"
              :key="log.id"
              class="recipe-card"
              :to="`/recipes/${log.recipeId}`"
            >
              <div class="photo-frame" :class="{ 'has-photo': log.photoPath }"></div>
              <div>
                <h3>{{ recipeName(log.recipeId) }}</h3>
                <p class="muted">{{ log.cookedAt }} · {{ log.note }}</p>
                <div class="tags">
                  <span v-if="log.nextNote" class="tag">下次：{{ log.nextNote }}</span>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <div v-else class="home-columns">
      <section class="screen">
        <div class="section-head">
          <div>
            <p class="eyebrow">最近做过</p>
            <h2>做饭记录流</h2>
          </div>
          <span class="counter">{{ recentLogs.length }} 条</span>
        </div>

        <div class="card-list">
          <RouterLink
            v-for="log in recentLogs"
            :key="log.id"
            class="recipe-card"
            :to="`/recipes/${log.recipeId}`"
          >
            <div class="photo-frame" :class="{ 'has-photo': log.photoPath }"></div>
            <div>
              <h3>{{ log.recipeName }}</h3>
              <p class="muted">{{ log.cookedAt }} · {{ log.note }}</p>
              <div class="tags">
                <span v-if="log.result" class="tag">{{ log.result === 'good' ? '好吃' : log.result === 'ok' ? '一般' : '翻车' }}</span>
                <span v-if="log.nextNote" class="tag">下次：{{ log.nextNote }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </section>

      <section class="screen">
        <div class="section-head">
          <div>
            <p class="eyebrow">想做</p>
            <h2>等着开火</h2>
          </div>
          <span class="counter">{{ wantToMakeRecipes.length }} 道</span>
        </div>

        <div class="card-list">
          <RouterLink
            v-for="recipe in wantToMakeRecipes"
            :key="recipe.id"
            class="recipe-card"
            :to="`/recipes/${recipe.id}`"
          >
            <div class="photo-frame"></div>
            <div>
              <h3>{{ recipe.name }}</h3>
              <p class="muted">{{ recipe.description ?? recipe.nextNote ?? '还没补充说明，先把它收进想做。' }}</p>
              <div class="tags">
                <span class="tag">想做</span>
                <span v-for="tag in recipe.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </section>
</template>
