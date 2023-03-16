import { test, expect } from "@playwright/test";

test("is connected", async ({ page }) => {
  await page.goto("/spotify");
  await expect(page).toHaveURL("/spotify");
});
