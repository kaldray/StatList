import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

dotenv.config({ override: true });

const authFile = "playwright/.auth/user.json";
export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  globalSetup: require.resolve("./global-setup.ts"),
  reporter: [["html", { open: "on-failure" }]],
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    video: "on",
    storageState: authFile,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], storageState: authFile },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], storageState: authFile },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"], storageState: authFile },
    },
    {
      name: "Mobile Chrome",
      testMatch: /[A-Za-z]+-mobile\.[A-Za-z]+\.[A-Za-z]+/i,
      use: { ...devices["Pixel 5"], storageState: authFile },
    },
    {
      name: "Mobile Safari",
      testMatch: /[A-Za-z]+-mobile\.[A-Za-z]+\.[A-Za-z]+/i,
      use: { ...devices["iPhone 12"], storageState: authFile },
    },
  ],
  outputDir: "playwright-results/",
  webServer: {
    command: "pnpm dev",
    url: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
