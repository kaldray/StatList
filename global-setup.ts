import { FullConfig, chromium } from "@playwright/test";

async function globalSetup(config: FullConfig): Promise<void> {
  if (config.projects[0] === undefined) return;
  const { baseURL, storageState } = config.projects[0].use;

  const credentials = {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  };

  if (baseURL !== undefined) {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
      recordVideo: {
        dir: "./videos/",
        size: {
          height: 1080,
          width: 1920,
        },
      },
    });
    const page = await context.newPage();
    try {
      page.video();
      await page.goto(baseURL);
      await page.getByRole("button", { name: "Se connecter" }).click({ delay: 1000 });
      await page.getByRole("button", { name: "Se connecter avec Spotify" }).click({ delay: 1000 });
      await page.getByTestId("login-username").type(credentials.username);
      await page.getByTestId("login-password").type(credentials.password);
      await page.getByTestId("login-button").click({ clickCount: 2, delay: 1200 });
      await context.storageState({ path: storageState as string });
      await page.video()?.saveAs("test");
      await context.close();
      await browser.close();
    } catch (err: unknown) {
      await browser.close();
      throw err;
    }
  }
}

export default globalSetup;
