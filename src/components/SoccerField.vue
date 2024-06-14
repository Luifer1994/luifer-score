<template>
    <div ref="widgetContainer" class="container mt-12"></div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch, onMounted } from 'vue';
import { useTeam } from '@/modules/team/composables/useTeam';

const { getWidgetByFixture } = useTeam();

const props = defineProps<{
    eventId: number;
}>();

const widgetContainer = ref<HTMLElement | null>(null);

const loadWidget = async (eventId: number) => {
    if (widgetContainer.value) {
        // Obtén el HTML del widget desde la API
        const widgetHtml = await getWidgetByFixture(eventId);

        // Limpia el contenedor antes de agregar el nuevo widget
        widgetContainer.value.innerHTML = '';

        // Crea un iframe
        const iframe = document.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '600px'); // Ajusta el tamaño según sea necesario
        iframe.setAttribute('frameborder', '0');
        widgetContainer.value.appendChild(iframe);

        // Inserta el HTML del widget en el iframe
        iframe.contentWindow?.document.open();
        iframe.contentWindow?.document.write(widgetHtml);
        iframe.contentWindow?.document.close();
    }
};

watch(() => props.eventId, (eventId) => {
    if (eventId) {
        loadWidget(eventId);
    }
});

onMounted(() => {
    if (props.eventId) {
        loadWidget(props.eventId);
    }
});
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>