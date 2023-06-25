import { test, expect } from "@playwright/test";

test.use({
  storageState: { cookies: [], origins: [] },
});

test("redirect and middleware when unauthenticated", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
  await page.getByRole("link", { name: "Condition d'utilisation" }).click();
  await expect(page).toHaveURL("/term");
  await page.goto("/spotify");
  await expect(page).toHaveURL("/");
  await page.goto("/deezer");
  await expect(page).toHaveURL("/");
  await page.getByRole("button", { name: "Se connecter" }).click();
  const locator = page.getByRole("button", { name: "Se connecter" });
  await expect(locator).toBeInViewport();
});
