<template>
  <span class="z-50 bg-surface-1/75 text-rosewater p-2 rounded-sm">{{ text }}</span>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>