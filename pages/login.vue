<template>
  <main class="w-full h-full flex flex-row justify-center items-center">
    <div class="w-1/2 flex flex-col justify-center items-center gap-4">
      <form class="flex flex-col w-96 gap-8 bg-mantle p-12 rounded-md">
        <h1 class="text-text text-2xl">Войти в аккаунт</h1>
        <CommonTextInput placeholder="Введите логин" v-model="username" type="text"/>
        <CommonTextInput placeholder="Введите пароль" v-model="password" type="password"/>
        <CommonBoxButton variant="success" @click.prevent="login">
          Войти
        </CommonBoxButton>
      </form>
      <div class="flex flex-col w-96 bg-mantle p-4 rounded-md">
        <h1 class="text-text text-xl mb-4">Ещё не зарегистрированы?</h1>
        <CommonBoxButton variant="flamingo" >
          <NuxtLink to="/signup">
            Зарегистрироватся
          </NuxtLink>
        </CommonBoxButton>
      </div>
    </div>
    <LandingHeart3D class="hidden md:block" />
  </main>
</template>

<script setup lang="ts">
import isSuccess from '~/helpers/is-success';


const { $api } = useNuxtApp()

const username = ref('')
const password = ref('')

const login = async (e:Event) =>{
  e.preventDefault()
  const res = await $api.auth.login(username.value, password.value)
  if(!isSuccess(res)){
    console.log(res.errMessage)
    return
  }
  navigateTo('/dating')
  
}
definePageMeta({
  layout: 'default'
})
</script>
