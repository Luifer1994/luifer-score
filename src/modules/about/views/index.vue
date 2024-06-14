<script setup lang="ts" name="About">

import { onMounted } from 'vue';

import { useCountry } from '@/modules/country/composables/useCountry';


const { getCountries, countries } = useCountry();

onMounted(async () => {
  await getCountries();
});

</script>


<template>
  <div>about</div>

</template>
