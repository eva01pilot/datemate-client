<template>
  <div class="relative">
    <button
      :onmouseenter="onHoverEnter"
      :onmouseleave="onHoverLeave"
      :onfocusin="onHoverEnter"
      :onfocusout="onHoverLeave"
      :class="`${variant ? variants[variant] : ''}  duration-100`"
    >
      <slot />
    </button>
    <CommonTooltip
      :class="`absolute ${
        tooltipPosition
          ? tooltipPositions[tooltipPosition]
          : '-left-[110%] top-[120%]'
      }`"
      v-if="tooltipVisible && tooltipText"
      :text="tooltipText ? tooltipText : ''"
    />
  </div>
</template>

<script setup lang="ts">
import cntl from "cntl";

const tooltipVisible = ref(false);

const onHoverEnter = () => {
  console.log("enter");
  tooltipVisible.value = true;
};

const onHoverLeave = () => {
  console.log("leave");
  tooltipVisible.value = false;
};

const tooltipPositions = {
  left: cntl`left-full`,
  right: cntl`right-full`,
  top: cntl`top-full`,
  bottom: cntl`bottom-full`,
};

const variants = {
  success: cntl`bg-green text-base hover:bg-green/75 rounded-md  p-2 w-full`,
  danger: cntl`bg-red text-base rounded-md  p-2 w-full`,
  flamingo: cntl`bg-flamingo text-base hover:bg-flamingo/75 rounded-md  p-2 w-full`,
  profile: cntl`flex items-center justify-center p-3 rounded-full duration-100`,
  themeswitcher: cntl`hover:bg-surface-2 rounded-full w-8 h-8 duration-100 p-0`,
} as const;

defineProps<{
  variant?: keyof typeof variants;
  tooltipText?: string;
  tooltipPosition?: "left" | "right" | "bottom" | "top";
}>();
</script>
