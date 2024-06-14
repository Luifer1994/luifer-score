import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import { VitePWA } from "vite-plugin-pwa";
import { enableCDN } from "./build/cdn";

const root: string = process.cwd();

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  return {
    base: "https://luifer1994.github.io/luifer-score/",
    plugins: [
      vue(),
      vueJsx(),
      mockDevServerPlugin(),
      Components({
        dts: "src/typings/components.d.ts",
        resolvers: [VantResolver()],
      }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(root, "src/icons/svg")],
        symbolId: "icon-[dir]-[name]",
      }),
      vueSetupExtend(),
      viteCompression(),
      createHtmlPlugin({
        inject: {
          data: {
            ENABLE_ERUDA: env.VITE_ENABLE_ERUDA || "false",
          },
        },
      }),
      enableCDN(env.VITE_CDN_DEPS),
      VitePWA({
        mode: "production",
        base: "/",
        srcDir: "src",
        filename: "sw.ts",
        includeAssets: ["/luifer-score/favicon.ico"],
        strategies: "injectManifest",
        manifest: {
          name: "Luifer score",
          short_name: "Luifer score",
          description: "Aplicación para llevar el control de los partidos de futbol",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/luifer-score/icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/luifer-score/icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        }
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      host: true,
      proxy: {
        "^/dev-api": {
          target: "",
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
