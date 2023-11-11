import { type FullConfig, firefox } from "@playwright/test";

async function globalSetup(config: FullConfig): Promise<void> {
  if (config.projects[0] === undefined) return;
  const { baseURL, storageState } = config.projects[0].use;

  if (baseURL !== undefined) {
    const browser = await firefox.launch({ headless: false });
    const context = await browser.newContext({
      viewport: {
        height: 1080,
        width: 1920,
      },
      recordVideo: {
        dir: "playwright-report/",
        size: {
          height: 1080,
          width: 1920,
        },
      },
    });
    try {
      const page = await context.newPage();
      page.video();
      await page.goto(baseURL);
      await page.getByRole("button", { name: "Se connecter" }).click();
      await page.getByRole("button", { name: "Se connecter avec Spotify" }).click({ delay: 1000 });
      await page.getByTestId("login-username").fill(process.env.USERNAME);
      await page.getByTestId("login-password").fill(process.env.PASSWORD);
      await page.getByTestId("login-button").dblclick({ delay: 2000 });
      await context.storageState({ path: storageState as string });
      await browser.close();
    } catch (err: unknown) {
      await browser.close();
      throw err;
    }
  }
}

export default globalSetup;
