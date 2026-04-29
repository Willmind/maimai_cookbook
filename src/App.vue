<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const showAllRecipesButton = computed(() => route.name !== 'recipes')
const showNewRecipeButton = computed(() => route.name !== 'new-recipe')
</script>

<template>
  <main class="app-shell">
    <header class="top">
      <RouterLink class="brand" to="/">
        <strong>麦麦手记</strong>
        <span>个人菜谱记录本</span>
      </RouterLink>

      <nav class="top-actions" aria-label="主要操作">
        <RouterLink v-if="showAllRecipesButton" class="secondary-action" to="/recipes">全部菜谱</RouterLink>
        <RouterLink v-if="showNewRecipeButton" class="primary-action" to="/recipes/new">记一道菜</RouterLink>
      </nav>
    </header>

    <RouterView v-slot="{ Component }">
      <Transition name="page-fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

