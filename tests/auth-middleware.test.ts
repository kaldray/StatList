import { test, expect } from "@playwright/test";

test("redirect and middleware when authenticated", async ({ page }) => {
  await page.goto("/spotify");
  await expect(page).toHaveURL("/spotify");
  await page.getByRole("link", { name: "Condition d'utilisation" }).click();
  await expect(page).toHaveURL("/term");
  await page.getByRole("link", { name: "Meilleur artiste" }).click();
  await expect(page).toHaveURL("/spotify/artist");
  await page.getByRole("link", { name: "Meilleure chanson" }).click();
  await expect(page).toHaveURL("/spotify/track");
  await page.goto("/");
  await expect(page).toHaveURL("/spotify");
  await page.goto("/spotify/track/random");
  await expect(page).toHaveURL("/spotify");
});
