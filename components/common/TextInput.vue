<template>
  <div>
    <input
      @change="(e)=>emit('change',e)"
      @input="(e)=>emit('input',e)"
      :class="`w-full rounded-md bg-surface-0 p-2 text-text duration-100 placeholder:text-text/60 hover:bg-surface-1 focus:outline-surface-1 ${
        error && 'border border-red'
      }`"
      :type="type"
      v-model="modelValue"
      :placeholder="placeholder"
    />
    <span class="text-red" v-if="errMessage">{{ errMessage }}</span>
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel({
  required: false,
});

const emit = defineEmits(["change", "input"]);

const props = defineProps<{
  type: "password" | "text";
  placeholder: string;
  error?: boolean;
  errMessage?: string | null;
}>();
</script>
