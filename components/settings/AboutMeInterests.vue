<template>
  <div class="flex h-64 w-1/2 flex-col rounded-md bg-surface-0 p-2">
    <div
      v-if="userInterests?.length"
      class="flex flex-row flex-wrap justify-center gap-x-4 gap-y-6 p-2"
    >
      <button v-for="userInterest in userInterests">
        <CommonChip @click="transferToTable(userInterest)"
          ><span>-</span> {{ userInterest.name }}</CommonChip
        >
      </button>
    </div>
    <p class="text-text/60" v-else>Чем вы интересуетесь?</p>
  </div>

  <div class="flex h-64 w-1/2 flex-col overflow-scroll rounded-md bg-surface-0">
    <div class="flex flex-row justify-start border-b text-center text-text">
      <button
        :class="`p-2 text-text duration-100 hover:bg-base/75 ${
          selectedPage === category.name && 'bg-base/75'
        }`"
        @click="selectPage(category.name)"
        v-for="category in categories"
      >
        {{ category.name }}
      </button>
    </div>
    <div v-for="category in categories">
      <div
        class="flex flex-row flex-wrap justify-center gap-x-4 gap-y-6 p-4"
        v-if="selectedPage === category.name"
      >
        <button v-if="category.interests.length" v-for="interest in category.interests">
          <CommonChip @click="transferToUser(interest)"
            ><span>+</span> {{ interest.name }}</CommonChip
          >
        </button>
        <p class="text-text/75" v-else>Пусто :(</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import isSuccess from "~/helpers/is-success";
import type { Category, Interest } from "../../plugins/api/interest";
import { useUserSettingsStore } from "~/store/user-settings";
const { $api } = useNuxtApp();

const categories = ref<Category[]>([]);
const userInterests = ref<Interest[]>([]);

const { setInterests } = useUserSettingsStore().actions;

const interestsResponse = await $api.interests.getAll();

const userResponse = await $api.auth.verifyLogin();

if (isSuccess(userResponse)) {
  userInterests.value = userResponse.data.user.interests;
}
if (isSuccess(interestsResponse)) {
  categories.value = interestsResponse.data.categories.map((cat) => ({
    ...cat,
    interests: cat.interests.filter(
      (int) => !userInterests.value.find((uint) => uint.id === int.id)
    ),
  }));
}

const selectedPage = ref<string>(categories.value[0].name);

const selectPage = (page: string) => {
  selectedPage.value = page;
};

const transferToUser = (interest: Interest) => {
  userInterests.value.push(interest);
  categories.value = categories.value?.map((cat) => ({
    ...cat,
    interests: cat.interests.filter((int) => int.id !== interest.id),
  }));

  setInterests(userInterests.value);
};

const transferToTable = (interest: Interest) => {
  userInterests.value = userInterests.value.filter(
    (int) => int.id !== interest.id
  );
  categories.value
    .find((cat) => cat.id === interest.categoryId)
    ?.interests.push(interest);
  setInterests(userInterests.value);
};
</script>
