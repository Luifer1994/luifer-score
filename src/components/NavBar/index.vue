<script setup lang="ts">
import { useDarkMode, useToggleDarkMode } from "@/hooks/useToggleDarkMode";

const onClickRight = () => {
  useToggleDarkMode();
};
</script>

<template>
  <van-nav-bar fixed placeholder @click-right="onClickRight">

    <template #left >
      <img width="60" height="60" src="https://img.icons8.com/bubbles/100/000000/football2.png" alt="football2"/> <span class="text-[18px] text-lg font-bold">Luifer Score</span> 
    </template>
    

    <template #right>
      <svg-icon class="text-[18px]" :name="useDarkMode() ? 'light' : 'dark'" />
    </template>

   

  </van-nav-bar>
</template>

<style scoped>


</style>
