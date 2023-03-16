import { test as setup } from "@playwright/test";

const authFile = "/playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.getByRole("button", { name: "Se connecter avec Spotify" }).click();
  await page.getByTestId("login-username").fill(authFile.username);
  await page.getByTestId("login-password").fill(authFile.password);
  await page.getByTestId("login-button").click();

  await page.context().storageState({ path: authFile });
});
