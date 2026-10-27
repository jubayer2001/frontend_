import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],

    // The site is served from the root. For a sub-folder (for example GitHub Pages at /my-repo/)
    // set VITE_BASE_PATH=/my-repo/ when you build.
    base: env.VITE_BASE_PATH || "/",

    server: {
      // In development the browser talks to /api on the Vite origin and Vite
      // forwards it to the Express server: no CORS setup, cookies stay same-site.
      proxy: {
        "/api": {
          target: env.VITE_DEV_PROXY_TARGET || "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },

    build: {
      // Vite 8's default Lightning CSS minifier can drop the standard
      // backdrop-filter declaration, breaking glass effects in Chromium.
      // Keep CSS unminified until the upstream minifier regression is resolved.
      cssMinify: false,
    },

    test: {
      environment: "jsdom",
      // Tests always run against the in-memory demo backend, whatever .env.local says.
      env: { VITE_CAREWELL_DATA_MODE: "demo", VITE_ADMIN_LOGIN_PATH: "/staff-test-sign-in" },
      setupFiles: "./src/test/setup.js",
      css: false,
      include: ["src/**/*.test.{js,jsx}"],
    },
  };
});
