<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <section class="screen">
    <p class="muted">记录一次骨架：将从菜谱 {{ id }} 带入只读菜名。</p>
  </section>
</template>

