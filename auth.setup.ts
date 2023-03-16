import { test as setup } from "@playwright/test";

const authFile = "./playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Se connecter" }).click();
  await page.getByRole("button", { name: "Se connecter avec Spotify" }).click();
  await page.getByTestId("login-username").fill(process.env.USERNAME);
  await page.getByTestId("login-password").fill(process.env.PASSWORD);
  await page.getByTestId("login-button").click();

  await page.context().storageState({ path: authFile });
});
