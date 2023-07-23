<template>
  <div class="flex w-64 flex-col gap-8 md:w-96">
    <h1 class="text-2xl text-text">Зарегистрироваться</h1>
    <CommonTextInput
      placeholder="Введите логин"
      v-model="username"
      type="text"
    />
    <CommonTextInput
      @change="validateSamePass"
      placeholder="Введите пароль"
      v-model="password"
      type="password"
    />
    <CommonTextInput
      :err-message="errors['repeatPass']"
      :error="!!errors['repeatPass']"
      @change="validateSamePass"
      placeholder="Повторите пароль"
      v-model="repeatPassword"
      type="password"
    />
    <CommonBoxButton variant="success" @click.prevent="signUp">
      Зарегистрироваться
    </CommonBoxButton>
  </div>
</template>

<script setup lang="ts">
import isSuccess from "~/helpers/is-success";

const username = ref("");
const password = ref("");
const repeatPassword = ref("");
const errors = reactive<{
  repeatPass: null | string;
  existingUsername: null | string;
}>({
  repeatPass: null,
  existingUsername: null,
});

const validateSamePass = () => {
  const isValid = password.value === repeatPassword.value;
  if (!isValid) {
    errors.repeatPass = "Пароли не совпадают";
    return;
  }
  errors.repeatPass = null;
};

const signUp = async (e: Event) => {
  e.preventDefault();
  const { $api } = useNuxtApp();

  const result = $api.auth.signUp(username.value, password.value);

  if (!isSuccess(result)) {
    errors.existingUsername = "Имя пользователя уже существует";
  }
  navigateTo('/dating')
};
</script>
