<template>
  <button :class="`
    ${isActive ? 'bg-main-gradient' : ''}
              ${border ? 'border-text' : ''} 
    text-white p-2 rounded-[10px] text-[16px] pl-[12px]  font-inter font-semibold flex flex-row items-center gap-2`">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean,
  border?: boolean
}>()
</script>
