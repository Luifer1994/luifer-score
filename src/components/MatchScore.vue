<template>
  <div @click="emitEvent" class="rounded-lg shadow-md p-4 max-w-sm w-full cursor-pointer">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center">
        <img lazy-load :src="homeTeam?.logo" :alt="homeTeam?.name" class="h-8 w-8 mr-2">
        <span class="text-lg font-bold">{{ homeTeam?.name }}</span>
      </div>
      <span class="text-2xl font-bold">{{ homeTeamScore }}</span>
    </div>
    <div class="text-center my-2 relative">
      <hr class="absolute w-full border-t-2 border-gray-200" style="top: 50%; transform: translateY(-50%);">
      <span :class="['status-time', statusClass]" class="relative px-2 z-10">{{ status }} {{ liveTime }}</span>
    </div>
    <div class="flex items-center justify-between mt-2">
      <div class="flex items-center">
        <img lazy-load :src="awayTeam?.logo" :alt="awayTeam?.name" class="h-8 w-8 mr-2">
        <span class="text-lg font-bold">{{ awayTeam?.name }}</span>
      </div>
      <span class="text-2xl font-bold">{{ awayTeamScore }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { AwayClass } from '@/modules/team/types/teamInterfaces';

const props = defineProps<{
  homeTeam: AwayClass | undefined;
  awayTeam: AwayClass | undefined;
  homeTeamScore: number | null;
  awayTeamScore: number | null;
  liveTime: string | number | null;
  status?: string | number;
  eventId?: string | number;
}>();

const emits = defineEmits(['event-click']);

const statusClass = computed(() => {
  switch (props.status) {
    case 'TBD':
    case 'NS':
      return 'bg-gray-500';
    case '1H':
    case '2H':
    case 'ET':
    case 'BT':
    case 'P':
    case 'INT':
    case 'LIVE':
      return 'bg-green-500';
    case 'HT':
      return 'bg-yellow-500';
    case 'FT':
    case 'AET':
    case 'PEN':
      return 'bg-blue-500';
    case 'SUSP':
    case 'PST':
    case 'CANC':
    case 'ABD':
      return 'bg-red-500';
    case 'AWD':
    case 'WO':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
});

const emitEvent = () => {
  emits('event-click', props.eventId);
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.bg-white {
  background-color: white;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.z-0 {
  z-index: 0;
}

.z-10 {
  z-index: 10;
}

.status-time {
  color: white;
  border-radius: 9999px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.bg-gray-500 {
  background-color: #6b7280;
  /* Gray-500 from Tailwind CSS */
}

.bg-green-500 {
  background-color: #10b981;
  /* Green-500 from Tailwind CSS */
}

.bg-yellow-500 {
  background-color: #f59e0b;
  /* Yellow-500 from Tailwind CSS */
}

.bg-blue-500 {
  background-color: #3b82f6;
  /* Blue-500 from Tailwind CSS */
}

.bg-red-500 {
  background-color: #ef4444;
  /* Red-500 from Tailwind CSS */
}

.bg-purple-500 {
  background-color: #8b5cf6;
  /* Purple-500 from Tailwind CSS */
}
</style>
