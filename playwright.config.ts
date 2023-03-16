import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

dotenv.config();

const authFile = "./playwright/.auth/user.json";
export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  globalSetup: require.resolve("./global-setup.ts"),
  reporter: [["html", { open: "on-failure" }]],
  use: {
    actionTimeout: 1000 * 5,
    baseURL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    video: "on-first-retry",
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
  outputDir: "./videos",
  webServer: {
    command: "pnpm dev",
    url: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    reuseExistingServer: true,
  },
});
