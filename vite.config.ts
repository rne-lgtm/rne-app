import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";

import { routeTemplate } from "./route-template";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [
      tailwindcss(),
      tanstackStart({
        router: {
          customScaffolding: {
            routeTemplate,
          },
        },
      }),
      react(),
      nitro({
        devServer: {
          port: Number(env.PORT),
        },
        preset: "cloudflare_module",
        cloudflare: {
          deployConfig: true,
          nodeCompat: true,
          wrangler: {
            workers_dev: false,
            preview_urls: false,
            compatibility_flags: [
              "nodejs_compat",
            ],
          },
        },
      }),
    ],
  };
});
