import { sveltekit } from "@sveltejs/kit/vite";
import { searchForWorkspaceRoot } from "vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [sveltekit()],
  // worker: {
  // 	plugins: [sveltekit()],
  // 	format: 'es'
  // },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), "/static/video/"],
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
