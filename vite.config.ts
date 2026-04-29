import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "node:path";
import url from "node:url";
import { defineConfig, loadEnv } from "vite";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const routeTemplate = `import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: () => {
  return <div>Hello "/"!</div>;
  },
});`;

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
        server: {
          entry: path.resolve(__dirname, "src/server.ts"),
        },
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
        serverEntry: path.resolve(__dirname, "src/server.ts"),
        serveStatic: "node",
      }),
    ],
  };
});
