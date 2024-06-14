import Layout from "@/layout/index.vue";
import Blank from "@/layout/blank.vue";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/modules/home/views/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    component: Layout,
    redirect: { name: "Home" },
    children: [
      {
        path: "home",
        name: "Home",
        component: Home,
        meta: {
          title: "Inicio",
          noCache: true
        }
      },
      {
        path: "tools",
        name: "Tools",
        component: () => import("@/views/tools/index.vue"),
        meta: {
          title: "Configuración",
          noCache: true
        }
      },
      {
        path: "about",
        name: "About",
        component: () => import("@/modules/about/views/index.vue"),
        meta: {
          title: "Mi Cuenta",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/config",
    name: "Config",
    component: Blank,
    children: [
      {
        path: "",
        name: "Config",
        component: () => import("@/modules/about/views/config.vue"),
        meta: {
          title: "Configuración",
          noCache: true
        }
      }
    ]
  }
];

export default routes;
