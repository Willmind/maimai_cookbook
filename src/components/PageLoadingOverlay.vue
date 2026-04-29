<template>
  <div class="page-loading-overlay" role="status" aria-live="polite">
    <div class="spinner" aria-hidden="true"></div>
    <p class="muted page-loading-text">加载中…</p>
  </div>
</template>

<style scoped>
.page-loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 260px;
}

.spinner {
  width: 26px;
  height: 26px;
  border-radius: 999px;
  border: 3px solid rgba(37, 25, 18, 0.12);
  border-top-color: rgba(200, 93, 63, 0.72);
  animation: maimai-spin 0.85s linear infinite;
}

.page-loading-text {
  margin: 0;
  font-size: 14px;
}

@keyframes maimai-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: none;
  }
}
</style>

