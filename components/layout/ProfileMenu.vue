<template>
  <div class="relative">
    <CommonBoxButton @click="emit('openMenu')" variant="profile">
        <img
          class="rounded-full"
          width="56"
          height="56"
          :src="avatar"
          onerror="this.src='/assets/images/blank-pfp.png';"
          alt="Профиль"
        />
    </CommonBoxButton>
    <div v-if="menuVisible" class="absolute top-full bg-surface-1 shadow-lg rounded-md shadow-base p-2 right-2">
      <div class="flex flex-col items-start justify-center gap-2">
        <CommonNavLink variant="profileLink" to="/settings">
          <CommonButtonWithIcon icon="material-symbols:settings-account-box">Настройки</CommonButtonWithIcon>
        </CommonNavLink>
        <CommonNavLink variant="profileLink" to="/">
          <CommonButtonWithIcon icon="material-symbols:logout" v-if="user?.id">Выйти</CommonButtonWithIcon>
          <CommonButtonWithIcon icon="material-symbols:login" v-else>Войти</CommonButtonWithIcon>
        </CommonNavLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useUserStore } from "~/store/user";

const { getters } = useUserStore();

const user = getters.getUser();
let avatar = user?.avatar as string;
const res = (await axios.get(user.avatar ?? '')).data

if(String(res).startsWith('<!DOCTYPE html>')) {
  avatar = 'assets/images/blank-pfp.png'
}

console.log(user)
defineProps<{
  menuVisible: boolean
}>()

const emit = defineEmits(['openMenu'])
</script>
