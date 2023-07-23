import PrimeVue from "primevue/config";
import Dropdown from "primevue/dropdown";

export default defineNuxtPlugin((NuxtApp)=>{
  NuxtApp.vueApp.use(PrimeVue);
  NuxtApp.vueApp.component("Dropdown", Dropdown)
})