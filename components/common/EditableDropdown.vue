<template >
  <Dropdown :input-class="inputClass" :options="getOptions()" :model-value="model" option-label="value.nameLocale"
    :editable="true" @change="(e: any) => change(e)" />
</template>

<script setup lang="ts" generic="T, U extends Item<T>">
import cntl from 'cntl';
import { Item } from './InputDropdown';


const inputClass = cntl`!w-full !px-[14px] !rounded-[10px] !py-4 !bg-surface-0 !text-text`
const panelClass = cntl`absolute z-50 rounded-[10px] w-full top-[110%] flex flex-col max-h-40 overflow-auto bg-surface-0 text-text`
const emit = defineEmits(['change'])
const model = ref()
const props = defineProps<{ options: U[] | undefined }>()
const change = (e: any) => {
  console.log(e.value)
  emit('change', e)
  model.value = e.value
}


onUpdated(() => {
  if (!model.value) return
  if (!props.options?.find(opt => opt.id === model.value.id)) {
    console.log(model.value, props.options?.map(el => el.id))
    model.value = undefined
  }
})
const getOptions = () => {
  return props.options?.map(el => ({
    ...el, value: {
      ...el.value,
      nameLocale: el.value.nameLocale.length > 30
        ? el.value.nameLocale.slice(0, 30).concat('...') : el.value.nameLocale
    }
  }))
}
</script>

<style>
.p-dropdown {
  background-color: inherit !important;
  border: 0px !important
}

input.p-inputtext {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.p-dropdown-trigger {
  background: rgb(var(--surface-0)) !important;
}

.p-dropdown-panel {
  margin-top: 10px;
}

.p-dropdown-panel,
.p-dropdown-panel>* {
  background-color: rgb(var(--surface-0));
  color: rgb(var(--text)) !important;
  border: 0px !important
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  color: rgb(var(--text)) !important;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
  background-color: rgb(var(--surface-1)) !important;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
  background-color: rgb(var(--surface-1)) !important;
}

.p-focus {
  background-color: rgb(var(--surface-1)) !important;
}

.p-dropdown-items {
  max-width: 100%;
  overflow: hidden;
}

.p-dropdown-item {
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
