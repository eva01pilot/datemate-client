<template>
  <div class="relative flex flex-col items-center md:flex-row">
    <Transition name="fade" mode="in-out">
      <div
        v-if="pickerOpen"
        class="absolute top-[4.5rem] mx-2 flex h-48 w-14 flex-col items-center justify-center rounded-xl bg-surface-0 md:static md:h-14 md:w-auto md:flex-row"
      >
        <div
          v-for="themeOption in options"
          class="mx-2 my-2"
          :key="themeOption.name"
        >
          <CommonBoxButton
            :tooltip-text="themeOption.name"
            @click="changeTheme(themeOption.name)"
            :variant="'themeswitcher'"
            class="text-lg"
          >
            {{ themeOption.icon }}
          </CommonBoxButton>
        </div>
      </div>
    </Transition>
    <button
      class="flex items-center justify-center rounded-full bg-surface-0 p-4 duration-100 hover:bg-surface-1"
      @click="emit('openPicker')"
    >
      <Icon
        name="material-symbols:palette-outline"
        size="25"
        class="text-text duration-100 hover:text-subtext-1"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "~/store/theme-store";
import type { theme } from "~/store/theme-store";

defineProps<{
  pickerOpen: boolean;
}>();

const emit = defineEmits(["openPicker"]);

const { setTheme } = useThemeStore().actions;

const changeTheme = (theme: theme) => {
  // eslint-disable-next-line no-console
  console.log(theme);
  setTheme(theme);
  useHead({
    htmlAttrs: {
      "data-theme": theme,
    },
  });
};
changeTheme("frappe");

const options = [
  { name: "latte" as theme, icon: "🌻" },
  { name: "frappe" as theme, icon: "🌺" },
  { name: "macchiato" as theme, icon: "🌷" },
  { name: "mocha" as theme, icon: "🌿" },
];
</script>
