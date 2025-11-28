import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@erroriq": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
  },
});
