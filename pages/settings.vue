<template>
  <SettingsAboutMe />
  <SettingsGallerySection />
  <CommonBoxButton @click="updateSettings">Сохранить</CommonBoxButton>
  
</template>

<script setup lang="ts">
import { useUserSettingsStore } from '~/store/user-settings';


const { updateSettings } = useUserSettingsStore().actions

definePageMeta({
  middleware: ['auth'],
  layout: 'settings-layout'
})
</script>