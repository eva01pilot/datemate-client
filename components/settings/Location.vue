<template>
  <CommonHeading lvl="2">Ваша локация</CommonHeading>
  <div class="flex flex-col gap-4">
    <CommonEditableDropdown @change="getRegions" :options="countries"  />
    <CommonEditableDropdown @change="getCities" :options="regions" />
    <CommonEditableDropdown @change="setCity" :options="cities" />
    <!-- <CommonInputDropdown @change="getRegions()" :modelValue="countries" placeholder="Страна" />
    <CommonInputDropdown @change="getCities()" :modelValue="regions" placeholder="Регион" />
    <CommonInputDropdown @change="setCity()" :modelValue="cities" placeholder="Город" /> -->
  </div>
</template>

<script setup lang="ts">
import { useUserSettingsStore } from '~/store/user-settings';
import CommonInputDropdown from '../common/InputDropdown.vue'

function log(e:any){
  console.log(e);
  
}
const { $api } = useNuxtApp()
const countriesRes = await $api.overpass.getCountries()
const actions = useUserSettingsStore().actions

type LocationItem = {
  id: string,
  visible: true,
  value: {
    selected: boolean,
    name: string,
    nameLocale: string,
  }
}


const countries = ref(countriesRes.elements.map((country: {
  tags: {
    "ISO3166-1:numeric": string,
    "name:ru": string, 
    "name:en": string
  }
}) => ({
  id: country.tags['ISO3166-1:numeric'],
  visible: true,
  value: {
    selected: false,
    name: country.tags['name:en'],
    nameLocale: country.tags['name:ru'],
  }
})) as LocationItem[])

const cities = ref<LocationItem[]>()
const regions = ref<LocationItem[]>()



const setCity = async(e: {
  value: LocationItem
}) => {
  selectedCity.value = e.value
  actions.setCity(selectedCity.value)
  
}


const getRegions = async(e: {
  value: LocationItem
}) =>{
  selectedCountry.value = e.value
  selectedRegion.value = undefined
  actions.setRegion(null)
  if(!selectedCountry.value) return
  actions.setCountry(selectedCountry.value)
  const countryNumeric = (selectedCountry.value as LocationItem)?.id
  const regionsRes = await $api.overpass.getRegions(countryNumeric)
  regions.value = regionsRes.elements.map((region: {
    tags: {
      "ISO3166-2": string,
      "name:ru": string, 
      "name:en": string
    }
  })=>({
    id: region.tags['ISO3166-2'],
    value: {
      name: region.tags['name:en'],
      nameLocale: region.tags['name:ru']
    }
  })).filter((item: {
    id: string,
  })=>!!item.id)

}


const getCities = async(e: {
  value: LocationItem
}) => {
  selectedCity.value = undefined
  actions.setCity(null)
  selectedRegion.value = e.value
  if(!selectedRegion.value) return
  actions.setRegion(selectedRegion.value)
  console.log(regions)
  const regionCode = (selectedRegion.value as LocationItem)?.id
  const countryCode = (selectedCountry.value as LocationItem)?.id

  const citiesRes = await $api.overpass.getCitiesByRegion(regionCode, countryCode)

  cities.value = citiesRes.elements.map((city: {
    id: string,
    tags: {
      "name:ru": string, 
      "name:en": string
    }
  })=>({
    id: city.id,
    value: {
      name: city.tags['name:en'],
      nameLocale: city.tags['name:ru']
    }
  }))
}

const selectedCountry = ref<LocationItem>()
const selectedRegion = ref<LocationItem>()
const selectedCity = ref<LocationItem>()


onUpdated(()=>{
})
</script>