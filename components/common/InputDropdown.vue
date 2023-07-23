<template>
  <div class="relative">
    <input ref="inputRef" @blur="unFocus" @click="focusEvent" @focus="focusEvent" @input="onSearch"
      class="w-full px-[14px] rounded-[10px] py-4 bg-surface-0 text-text" type="text" :value="isEditing ? searchValue : textValue"
      :placeholder="placeholder">
    <button class="absolute right-4 top-1/4" v-if="!disabled" ref="arrowButton" @click="changeDropdownVis">
      <IconsArrowDown :class="`${showDropdown ? 'rotate-180' : 'rotate-0'} transition-all duration-500`" />
    </button>
    <Transition name="list">
      <div tabindex="-1" ref="dropdownRef" id="dropdown-list" v-if="showDropdown"
        class="absolute z-50 rounded-[10px] w-full top-[110%] flex flex-col max-h-40 overflow-auto bg-surface-0 text-text">
        <button :ref="(el) => itemsList?.push(el)" :key="it.value.name" v-for="it in modelValue" 
          class="p-2 focus:bg-surface-1 duration-75 w-full h-full flex flex-row justify-start" tabindex="0"
          @click="selectValue(it.id)">{{ it.value.nameLocale || it.value.name }}</button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts" generic="T, U extends Item<T>">
import type { Item } from './InputDropdown'
import IconsArrowDown from '../icons/arrow-down.vue'
import { onClickOutside } from '@vueuse/core';

const dropdownRef = ref<HTMLUListElement>(null!)
const inputRef = ref<HTMLInputElement>(null!)
const arrowButton = ref()
const itemsList = ref<(Element | ComponentPublicInstance | null)[]>([])


defineProps<{
  placeholder: string,
}>()

const modelValue = defineModel<U[]>({
  required: false,
  
});
const emit = defineEmits(['change'])

onUpdated(() => {
  console.log(modelValue.value);

})

onBeforeUpdate(() => {
  itemsList.value = []
})

const showDropdown = ref(false)
const isEditing = ref(false)
const disabled = computed(() => {
  return !modelValue.value?.length
})

const textValue = computed(() => {
    return modelValue.value?.find(el => el.value.selected === true)?.value.nameLocale   
})

const selectedItemIndex = ref(-1)
const searchValue = ref('')
const selectedItem = computed(() => {
  if (selectedItemIndex.value >= 0) {
    return itemsList.value[selectedItemIndex.value]
  }
  return null
})

onClickOutside(dropdownRef, (e) => {
  if (e.target === inputRef.value) {
    console.log('ayayayayaya')
    return
  }
  console.log('oyoyoyoyoo');

  showDropdown.value = false
}, {
  ignore: [arrowButton, inputRef]
})

const focusEvent = () => {
  isEditing.value = true
  showDropdown.value = true
  modelValue.value =  modelValue.value?.map(el=>({...el, visible: true}))
  window.addEventListener('keydown', (e)=>{
    const key = e.key
    if(key==="ArrowDown") {
      isEditing.value = false
      handleDropdownFocus()
    }
  })
}

const unFocus = () => {
  isEditing.value = false
  modelValue.value =  modelValue.value?.map(el=>({...el, visible: true})) 
}


const onSearch = (e: Event) => {
  console.log('wtf') 
  const elem = e.target as HTMLInputElement
  searchValue.value = elem.value
  modelValue.value = modelValue.value?.map(el=>({...el, visible: el.value.nameLocale.includes(searchValue.value)}))
}

const changeDropdownVis = () => {
  console.log('changeDropVis')
  if (showDropdown.value) {
    showDropdown.value = false
    window.removeEventListener('keydown', () => {
      selectedItemIndex.value = -1
    })
    return
  }

  showDropdown.value = true
  handleDropdownFocus()
}

const selectValue = (id: string) => {
  if (!modelValue.value?.length) {
    return
  }
  if (!!modelValue.value.find((el) => el.id === id) === false) {
    return
  }
  modelValue.value.forEach((el) => {
    el.value.selected = false
  });
  (modelValue.value.find((el) => el.id === id) as U).value.selected = true;
  emit('change');
  showDropdown.value = false
}



modelValue.value =  modelValue.value?.map(el=>({...el, visible: true }))

const handleDropdownFocus = () => {
  console.log('dropfocus')
  window.addEventListener('keydown', (e) => {
    const key = e.key
    if (key === 'ArrowDown') {
      selectedItemIndex.value++
    }
    if (key === 'ArrowUp') {
      selectedItemIndex.value--
    }
    if (key === 'Escape') {
      selectedItemIndex.value = -1
      showDropdown.value = false
      return
    }
    if (!selectedItem.value) return
    console.log(selectedItem.value)
    !isEditing.value && (selectedItem.value as HTMLButtonElement).focus();
  })
}


</script>


<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>