<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useLeague } from '@/modules/league/composables/useLeague';

const { getAllLeagues } = useLeague();

onMounted(async () => {
  await getAllLeagues();
});

</script>

<style></style>
