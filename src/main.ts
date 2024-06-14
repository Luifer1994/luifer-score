import { createApp } from "vue";
import { store } from "./store";
// normalize.css
import "normalize.css/normalize.css";
// global css
import "./styles/index.less";
// tailwindcss
import "./styles/tailwind.css";
// svg icon
import "virtual:svg-icons-register";

import App from "./App.vue";
import router from "./router";

import { Locale } from 'vant';
import esES from 'vant/es/locale/lang/es-ES'; // Importa el paquete de idioma español

import { Lazyload } from 'vant';

Locale.use('es-ES', esES); // Configura Vant para usar español

const app = createApp(App);
app.use(Lazyload);
app.use(store);
app.use(router);

app.mount("#app");
