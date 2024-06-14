<template>

    <p class="text-lg font-bold my-5">
        Partidos en vivo
    </p>
    <div ref="widgetContainerAllFixtures" class="container rounded-lg shadow-md max-w-sm w-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTeam } from '@/modules/team/composables/useTeam';

const { getWidgetAllFixtures } = useTeam();

const widgetContainerAllFixtures = ref<HTMLElement | null>(null);

const loadWidget = async () => {
    if (widgetContainerAllFixtures.value) {
        // Obtén el HTML del widget desde la API
        const widgetHtml = await getWidgetAllFixtures();

        // Limpia el contenedor antes de agregar el nuevo widget
        widgetContainerAllFixtures.value.innerHTML = '';

        // Crea un iframe
        const iframe = document.createElement('iframe');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('height', '600px'); // Ajusta el tamaño según sea necesario
        iframe.setAttribute('frameborder', '0');
        widgetContainerAllFixtures.value.appendChild(iframe);

        // Inserta el HTML del widget en el iframe
        iframe.contentWindow?.document.open();
        iframe.contentWindow?.document.write(widgetHtml);
        iframe.contentWindow?.document.close();

        // Asegúrate de que los scripts se ejecuten
        const scripts = iframe.contentWindow?.document.getElementsByTagName('script');
        if (scripts) {
            for (let i = 0; i < scripts.length; i++) {
                const oldScript = scripts[i];
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.replaceWith(newScript);
            }
        }
    }
};

onMounted(async () => {
    await loadWidget();
});
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>