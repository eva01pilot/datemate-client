<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-indent -->
<template>
  <nav class="flex w-full flex-row items-center justify-between bg-mantle p-4 pl-8">
    <div class="flex flex-row items-center gap-4 md:gap-7">
      <CommonNavLink :variant="'logoLink'" to="/">
        <img class="w-[71px] pb-[6px]" src="assets/vector/miku-loli.svg" />
      </CommonNavLink>
      <CommonNavLink :variant="'dateLink'" to="/dating">
        <DateButton />
      </CommonNavLink>
    </div>
    <div class="flex flex-row items-center justify-start">
      <LayoutThemeSwitcher @openPicker="openPicker" :picker-open="isPickerOpen" ref="themeSwitcher" />
      <LayoutProfileMenu @openMenu="openMenu" :menu-visible="isProfileOpen" ref="profileMenu"/>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import DateButton from "./DateButton.vue";
 
const themeSwitcher = ref(null)
const profileMenu = ref(null)

const isPickerOpen = ref(false)
const isProfileOpen = ref(false)


const changeThemePickerVisibility = () => {
  isPickerOpen.value = false;
};

const changeProfileMenuVisibility = () => {
  isProfileOpen.value = false
}

onClickOutside(themeSwitcher, changeThemePickerVisibility)
onClickOutside(profileMenu, changeProfileMenuVisibility)

const openPicker = () => {
  isPickerOpen.value = !isPickerOpen.value;
}

const openMenu = () =>{
  isProfileOpen.value = !isProfileOpen.value
}
</script>

