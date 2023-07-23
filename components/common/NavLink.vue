<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/html-indent -->
<template>
  <NuxtLink :to="to" :class="variants[variant]">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import cntl from "cntl";

const variants = {
  // textLink: cntl`text-text decoration-text relative hover:text-red
  //     duration-100
  //     after:absolute
  //     after:border-t-2
  //     after:w-0
  //     after:-bottom-1
  //     after:left-1/2
  //     after:transition-all
  //     after:duration-200
  //     hover:after:w-full
  //     hover:after:left-0`,
  // textLinkNew: cntl`text-lavender p-2 bg-opacity-0 border-2 border-solid rounded-2xl `,
  dateLink: cntl``,
  logoLink: cntl``,
  profileLink: cntl`text-text`
} as const;

defineProps<{ variant: keyof typeof variants; to: string }>();
</script>
