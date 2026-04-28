<script setup lang="ts">
type SegmentedOption<TValue extends string> = {
  value: TValue
  label: string
  testId?: string
}

const props = defineProps<{
  label: string
  modelValue: string
  options: Array<SegmentedOption<string>>
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const choose = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="segmented-field">
    <div class="field-label">
      <span>{{ label }}</span>
    </div>

    <div class="segmented" role="radiogroup" :aria-label="label">
      <button
        v-for="option in options"
        :key="option.value"
        class="segmented-item"
        :class="{ selected: option.value === modelValue }"
        type="button"
        role="radio"
        :aria-checked="option.value === modelValue"
        :data-test="option.testId"
        @click="choose(option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

