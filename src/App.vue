<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="app-shell">
    <header class="top">
      <RouterLink class="brand" to="/">
        <strong>麦麦手记</strong>
        <span>个人菜谱记录本</span>
      </RouterLink>

      <nav class="top-actions" aria-label="主要操作">
        <RouterLink class="secondary-action" to="/recipes">全部菜谱</RouterLink>
        <RouterLink class="primary-action" to="/recipes/new">记一道菜</RouterLink>
      </nav>
    </header>

    <RouterView />
  </main>
</template>

