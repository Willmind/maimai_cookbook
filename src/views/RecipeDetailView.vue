<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <section class="screen">
    <p class="muted">菜谱详情骨架：当前菜谱 ID 为 {{ id }}。</p>
  </section>
</template>

