<template>
  <div class="pointer-events-auto" draggable="true" dropzone="move">
    <input @change="changePic" ref="fileInput" type="file" class="hidden">
    <div v-if='model?.src' class="relative rounded-[10px]" ref="imageRef">
      <img width="230" height="360" class="object-cover rounded-[10px] w-[230px] h-[360px]" :src="model.src" />
      <div class='absolute w-full flex flex-row items-center justify-center -bottom-3 gap-[14px]'>
        <button @click="fileInput.click()" class='bg-main-gradient rounded-full p-3'>
          <IconsReload />
        </button>
        <button @click="emit('deletePic')" class='bg-alt-gradient rounded-full p-3'>
          <IconsTrash />
        </button>
      </div>
    </div>
    <div :class="`relative border-text border-[2px] rounded-[10px] w-60 h-[360px] flex justify-center items-center ${(id > 2 && id === 3) ?
      'md:w-44 md:h-[276px]'
      : (id > 3 && id === 4) ?
        'md:w-[100.754px] md:h-[158px]' : 'md:w-60 md:h-[360px]'}`" v-else>
        <div class="flex flex-col items-center gap-3" v-if="canUpload">
          <button class="text-text" @click="fileInput.click()">
            <IconsAddPicture />
          </button>
          <span v-if="id!==4" class="text-text text-center">Загрузить <br/> фотографию</span>
          <span class="absolute bottom-1 right-1">
            <IconsCamera />
          </span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GalleryImage } from 'store/user-settings';
import { handleFileUpload, getBase64 } from '~/helpers/handleFileUpload'
const model = defineModel<GalleryImage>({
  required: false
})
const imageRef = ref()
const fileInput = ref<HTMLInputElement>(null!)

const emit = defineEmits(['deletePic'])

const changePic = async (e: Event) => {
  const file = handleFileUpload(e)
  console.log(file)
  if(!file) return

  const base64 = await getBase64(file) as string;
  if(!model.value) return
  model.value.src = base64
  model.value.type = 'base64'
  if(model.value.type === 'base64') {
    model.value.blob = file
  }
}

const props = defineProps<{
  id: number,
  canUpload: boolean,
}>()

defineExpose({
  model,
  props,
  imageRef
  
})

</script>
