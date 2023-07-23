<template>
  <slot name="children" :set-ref="setSlotRef" />
</template>

<script setup lang="ts">
interface Draggable{
  props: {
    id: number
  }
}


const slotRef = ref<Draggable[]>([])
const setSlotRef = (el: Draggable) => {
  slotRef.value.push(el);
  console.log(el)
}

onMounted(()=>{

})

const setupDrag = (e: Draggable) => {
  const id = e.props.id
  
}

</script>