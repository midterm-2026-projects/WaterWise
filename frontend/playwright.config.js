import { defineConfig, devices } from "@playwright/test";
import process from "node:process";

const frontendPort = process.env.E2E_FRONTEND_PORT || "5173";
const frontendUrl = process.env.BASE_URL || `http://127.0.0.1:${frontendPort}`;

export default defineConfig({

  testDir: "./src/test/e2e",

  globalSetup: "./src/test/e2e/globalSetup.js",

  globalTeardown: "./src/test/e2e/globalTeardown.js",

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: [
    ["list"],
    ["html", { open: "never" }],
  ],

  use: {
    baseURL: frontendUrl,

    screenshot: "only-on-failure",

    trace: "retain-on-failure",

    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

});
