import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login';

// Define the custom fixtures with a TypeScript interface.
interface CustomFixtures {
  loginPage: LoginPage;
}

// Extend the test object with our custom fixtures.
export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export * from '@playwright/test';