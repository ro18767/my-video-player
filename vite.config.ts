import { sveltekit } from "@sveltejs/kit/vite";
import { searchForWorkspaceRoot } from "vite";
import { defineConfig } from "vitest/config";
import path from "path";

const cwd = process.env["IS_WORKFLOW"] === "1"
  ? "/site/wwwroot"
  : searchForWorkspaceRoot(process.cwd());

console.log(cwd);
export default defineConfig({
  plugins: [sveltekit()],
  // worker: {
  // 	plugins: [sveltekit()],
  // 	format: 'es'
  // },
  server: {
    fs: {
      allow: [
        path.join(
          cwd,
          "/static/video/",
        ),
      ],
    },
  },
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
