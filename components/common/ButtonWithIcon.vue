<template>
<button class="flex flex-row justify-start items-center gap-2 p-2 hover:brightness-110 text-base">
  <Icon class="text-text" :name="icon" />
  <span class="text-text">
    <slot/>
    
  </span>
</button> 
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string,
}>();

</script>