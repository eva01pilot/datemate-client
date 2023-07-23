<template>
  <div>
    <textarea maxlength="300" cols="100" rows="3" @change="(e) => emit('change', e)" :class="`resize-none h-[200px] w-full rounded-md bg-surface-0 p-2 text-text duration-100 placeholder:text-text/60 hover:bg-surface-1 focus:outline-surface-1 ${error && 'border border-red'
      }`" v-model="modelValue" :placeholder="placeholder" />
    <span class="text-red" v-if="errMessage">{{ errMessage }}</span>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel({
  required: false,
});
const emit = defineEmits(["change"]);
const props = defineProps<{
  placeholder: string;
  error?: boolean;
  errMessage?: string | null;
}>();
</script>
