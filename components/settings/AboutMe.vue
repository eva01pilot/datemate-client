<template>
  <div class="flex flex-col gap-5 2xl:w-2/3">
    <CommonHeading lvl="omegabig">Расскажите о себе</CommonHeading>
    <div class="grid grid-cols-1 gap-x-5 gap-y-10 xl:grid-cols-2 xl:gap-x-28">
      <SettingsGender />
      <div>
        <CommonHeading lvl="2">Парочку (или побольше) слов о себе</CommonHeading>
        <CommonTextArea class="h-[185px]" :model-value="description" @change="changeDescription" :err-message="''"
          placeholder="Люблю капибар, себя и маму с папой" />
      </div>
      <div>
        <SettingsLocation />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSettingsStore } from '~/store/user-settings';
import cntl from 'cntl';

const description = computed(() => useUserSettingsStore().getters.getDescription())
const setDescription = useUserSettingsStore().actions.setDescription

const changeDescription = (e: Event) => {
  const elem = e.target as HTMLTextAreaElement
  setDescription(elem.value)
}


const { $api } = useNuxtApp()


console.log(await $api.interests.getAll())
</script>
