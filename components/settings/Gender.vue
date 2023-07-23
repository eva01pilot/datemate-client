<template>
  <div class="flex flex-col">
    <CommonHeading lvl="2">Ваш гендер</CommonHeading>
    <div class="flex flex-col md:flex-row gap-5">
      <CommonChip @click="actions.setGender(0)" class="bg-surface-0 w-full md:w-[146px]"
        :is-active="getters.getGender() === 0">
        👨🏻‍🦰 Мужчина
      </CommonChip>
      <CommonChip @click="actions.setGender(1)" class="bg-surface-0 w-full md:w-[146px]"
        :is-active="getters.getGender() === 1">
        👱🏻‍♀️ Женщина
      </CommonChip>
      <CommonChip @click="actions.setGender(2)" class="bg-surface-0 w-full md:w-[146px]"
        :is-active="getters.getGender() === 2">
        🌚 Другой
      </CommonChip>
    </div>
  </div>
  <div class="flex flex-col">
    <CommonHeading lvl="2">Кого вы ищете</CommonHeading>
    <div class="flex flex-col md:flex-row gap-5">
      <CommonChip @click="handleTargetGender(0)" class="bg-surface-0 w-full md:w-[146px]" :is-active="isActive(0)">
        <span class="flex flex-row items-center">
          👨🏻‍🦰 Мужчин
          <IconsDelete v-if="isActive(0)" />
          <IconsAdd v-else />
        </span>
      </CommonChip>
      <CommonChip @click="handleTargetGender(1)" class="bg-surface-0 w-full md:w-[146px]" :is-active="isActive(1)">
        <span class="flex flex-row items-center">
          👱🏻‍♀️ Женщин
          <IconsDelete v-if="isActive(1)" />
          <IconsAdd v-else />
        </span>
      </CommonChip>
      <CommonChip @click="handleTargetGender(2)" class="bg-surface-0 w-full md:w-[146px]" :is-active="isActive(2)">
        <span class="flex flex-row items-center">
          🌚 Других
          <IconsDelete v-if="isActive(2)" />
          <IconsAdd v-else />
        </span>
      </CommonChip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserSettingsStore } from '~/store/user-settings';

const getters = useUserSettingsStore().getters
const actions = useUserSettingsStore().actions

const isActive = (gender: 0 | 1 | 2) => {
  return getters.getTargetGenders()?.has(gender)
}

const handleTargetGender = (gender: 0 | 1 | 2) => {
  if (isActive(gender)) {
    actions.removeTargetGender(gender)
  } else {
    actions.addTargetGender(gender)
  }
}
</script>
