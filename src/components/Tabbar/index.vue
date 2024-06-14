<template>
  <van-tabbar v-model="active" :placeholder="true" :route="true" fixed>
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :to="item.to"
      :class="{
        'active': active === index,
        'dark': isDarkMode
      }"
    >
      <van-icon 
        :name="item.icon" 
        :color="active === index ? '#ee0a24' : (isDarkMode ? '#9CA3AF' : '#000000')" 
        class="transition-transform duration-300 icon-size" 
      />
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const active = ref(0);
const tabbarData = reactive([
  {
    icon: "fire-o",
    to: {
      name: "Home"
    }
  },
  {
    icon: "like-o",
    to: {
      name: "Tools"
    }
  },
  {
    icon: "contact-o",
    to: {
      name: "About"
    }
  }
]);

const isDarkMode = ref(false);

onMounted(() => {
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  isDarkMode.value = matchMedia.matches;
  matchMedia.addEventListener('change', (e) => {
    isDarkMode.value = e.matches;
  });
});
</script>

<style scoped>
.icon-size {
  font-size: 2rem; 
  font-weight: 500;
}

.active .icon-size {
  font-size: 1.5rem; 
  font-weight: 800; 
  transform: scale(2); 
}

.dark .icon-size {
  color: #9CA3AF; /* gris claro para modo oscuro */
}
</style>
