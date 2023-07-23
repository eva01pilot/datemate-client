<template>
  <CommonHeading lvl="2">Ваши прекрасные фотографии</CommonHeading>
  <div class="flex justify-center flex-col items-center md:justify-start">
    <div class="flex flex-row flex-wrap items-center gap-5 ">
      <SettingsGallery ref="imagesRef" :can-upload="checkCanUpload(id)" v-for="(_image, id) in images"
        @delete-pic="deletePic(id)" v-model="images[id]" :id="id" />
    </div>
    <p class="text-subtext-0 mt-9">
      Вы можете упорядочивать фотографии, зажимая левую кнопку мыши и перетаскивая фото влево или вправо
    </p>
  </div>
</template>

<script setup lang="ts">
import { GalleryImageBlob, useUserSettingsStore } from '~/store/user-settings';
import _ from 'lodash'

const imagesRef = ref<{
  imageRef: HTMLDivElement,
  model: string,
  props: { modelValue: string, id: number, canUpload: boolean }
}[]>([])

const filledCount = ref(0)

const { getGallery } = useUserSettingsStore().getters

const deletePic = (id: number) => {
  if (!images.value?.length) return
  images.value[id].src = ''
  images.value[id].type = 'base64'
  if (images.value[id].type === 'base64') {
    (images.value[id] as GalleryImageBlob).blob = null
  }
  images.value = images.value.sort((a, b) => a.src.length !== 0 ? 0 : b.src.length - a.src.length)
}

const checkCanUpload = (id: number) => {
  filledCount.value = images.value.filter((img) => !!img.src).length
  if (filledCount.value === id) {
    return true
  }
  return false
}

const images = ref(
  getGallery()?.images
);

onMounted(() => {
  addListeners()
})


watch(filledCount, (val, old) => {
  if (val > old) {
    removeListeners()
    addListeners()
  }
}, {
  flush: 'post'
})


const removeListeners = () => {
  imagesRef.value.forEach((img) => {
    if (!img.imageRef) return
    img.imageRef.removeEventListener('dragstart', () => { })
    img.imageRef.removeEventListener('drop', () => { })


  })
}

const addListeners = () => {
  imagesRef.value.forEach((img) => {
    if (!img.imageRef) return
    img.imageRef.addEventListener('dragstart', (e) => {
      if (!e.dataTransfer) return

      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer?.setData('elemID', img.props.id.toString())
    })
    img.imageRef.addEventListener('drop', (e) => {
      e.preventDefault()

      const id = e.dataTransfer?.getData('elemID')
      if (typeof id === 'undefined') return
      const targetImageID = imagesRef.value.find(image => image.imageRef === e.currentTarget)?.props.id
      if (typeof targetImageID === 'undefined') return

      if (!images.value?.length) return
      const exchanger = _.cloneDeep(images.value[targetImageID])
      images.value[targetImageID] = _.cloneDeep(images.value[+id])
      images.value[+id] = _.cloneDeep(exchanger)

      e.stopImmediatePropagation();
    })

    img.imageRef.addEventListener('dragover', (e) => e.preventDefault())
    img.imageRef.addEventListener('dragenter', (e) => e.preventDefault())
  })
}
</script>
