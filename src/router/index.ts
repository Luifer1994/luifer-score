import {
  createRouter,
  createWebHashHistory,
  type RouteLocationNormalized,
} from "vue-router";
import routes from "./routes";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import NProgress from "@/utils/progress";
import setPageTitle from "@/utils/set-page-title";
import { useAbout } from "@/modules/about/composables/useAbout";
import { MyInfo } from "@/modules/about/types/aboutInterfaces";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    title?: string;
    noCache?: boolean;
  };
}

// Función para verificar si un objeto cumple con la interfaz MyInfo
function isMyInfo(obj: any): obj is MyInfo {
  return (
    typeof obj.name === "string" &&
    obj.country &&
    typeof obj.country.name === "string" &&
    typeof obj.country.code === "string" &&
    typeof obj.country.flag === "string" &&
    obj.team &&
    typeof obj.team.name === "string" &&
    (obj.team.code === undefined || obj.team.code === null || typeof obj.team.code === "string") &&
    typeof obj.team.country === "string" &&
    typeof obj.team.founded === "number" &&
    typeof obj.team.national === "boolean" &&
    typeof obj.team.logo === "string" &&
    (!obj.team.venue ||
      (typeof obj.team.venue.name === "string" &&
        typeof obj.team.venue.address === "string" &&
        typeof obj.team.venue.city === "string" &&
        typeof obj.team.venue.capacity === "number" &&
        typeof obj.team.venue.surface === "string" &&
        typeof obj.team.venue.image === "string"))
  );
}

router.beforeEach((to: toRouteType, from, next) => {
  NProgress.start();

  const { myInfo } = useAbout();
  const infoValue = myInfo.value;

  if (Object.keys(infoValue).length === 0 || !isMyInfo(infoValue)) {
    if (to.name !== "Config") {
      next({ path: "/config" });
      return; 
    }
  }

  useCachedViewStoreHook().addCachedView(to);
  setPageTitle(to.meta.title);
  next();
});


router.afterEach(() => {
  NProgress.done();
});

export default router;
