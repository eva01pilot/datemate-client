<template>
  <h1 v-if="lvl==='omegabig'" class="text-[32px]  md:text-[64px] text-[#fff] font-inter big-shadow"><slot/></h1>
  <h1 v-if="lvl==='1'" class="text-text text-2xl mb-8"><slot /></h1>
  <h2 v-if="lvl==='2'" class="text-text text-xl mb-4"><slot /></h2>
  <h3 v-if="lvl==='3'" class="text-text text-lg mb-2"><slot /></h3>
</template>

<script setup lang="ts">
defineProps<{
  lvl: '1' | '2' | '3' | 'omegabig',
  additionalClass?: string
}>()
</script>

<style scoped>
.big-shadow {
  text-shadow: 30px 10px rgb(var(--text) , 0.1); ;
}
</style>