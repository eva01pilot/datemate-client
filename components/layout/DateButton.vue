<template>
  <button
    class="date-link-gradient date-link-shadow relative hidden origin-center rounded-[20px] py-[9px] pl-14 pr-8 text-center font-inter text-[14px] font-medium text-[#ffffff] transition-all duration-300 ease-in-out hover:scale-95 hover:text-[13px] sm:block"
  >
    <TwoHearts class="absolute -left-[0.5px] bottom-1 w-[40px] fill-red" />
    <span class="relative tracking-[0.12em] after:absolute"> ЗНАКОМИТЬСЯ </span>
  </button>
  <button
    class="date-link-gradient date-link-shadow block rounded-full p-2 text-[#ffffff] sm:hidden"
  >
    <TwoHearts class="fill-red" />
  </button>
</template>

<script setup lang="ts">
import TwoHearts from "../icons/two-hearts.vue";

</script>

<style scoped>
button:hover img {
  width: 39.61px;
}

html[data-theme="latte"] .date-link-gradient {
  background: linear-gradient(270deg, #1e66f5 0%, #209fb5 100%),
    linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
}

html[data-theme="latte"] .date-link-gradient:hover {
  background: linear-gradient(270deg, #fe640b 0%, #e64553 100%),
    linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
}

html[data-theme="latte"] .date-link-shadow {
  box-shadow: 0px 7px 12px 0px #1e66f533;
}

html[data-theme="latte"] .date-link-shadow:hover {
  box-shadow: 0px 7px 12px 0px #f577574d;
  filter: brightness(120%);
}

html[data-theme="frappe"] .date-link-gradient {
  background: linear-gradient(270deg, #81c8be 0%, #8caaee 100%),
    linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
}

html[data-theme="frappe"] .date-link-gradient:hover {
  background: linear-gradient(270deg, #e78284 0%, #ef9f76 100%),
    linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
}

html[data-theme="frappe"] .date-link-shadow {
  box-shadow: 0px 7px 12px 0px #89b0e41c;
}

html[data-theme="frappe"] .date-link-shadow:hover {
  box-shadow: 0px 7px 12px 0px #ed9d9b1f;
  filter: brightness(120%);
}

html[data-theme="macchiato"] .date-link-gradient {
  background: linear-gradient(270deg, #d88a91 0%, #c981e2 100%),
    linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
}

html[data-theme="macchiato"] .date-link-gradient:hover {
  background: linear-gradient(270deg, #7881aa 0%, #5073ba 100%),
    linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
}

html[data-theme="macchiato"] .date-link-shadow {
  box-shadow: 0px 7px 12px 0px #d89dcf1a;
}

html[data-theme="macchiato"] .date-link-shadow:hover {
  box-shadow: 0px 7px 12px 0px #8997bf33;
  filter: brightness(120%);
}

html[data-theme="mocha"] .date-link-gradient {
  background: linear-gradient(270deg, #c14f6f 0%, #553b74 100%),
    linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));
}

html[data-theme="mocha"] .date-link-gradient:hover {
  background: linear-gradient(270deg, #86c646 0%, #296649 100%),
    linear-gradient(0deg, #ffffff, #ffffff),
    linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2));
}

html[data-theme="mocha"] .date-link-shadow {
  box-shadow: 0px 7px 12px 0px #89457133;
}

html[data-theme="mocha"] .date-link-shadow:hover {
  box-shadow: 0px 7px 12px 0px #7bad6c33;
  filter: brightness(120%);
}
</style>
