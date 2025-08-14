import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login';
import { UserManagementPage } from './pages/userManagement';

// Define the custom fixtures with a TypeScript interface.
interface CustomFixtures {
  loginPage: LoginPage;
  userManagementPage: UserManagementPage;
}

// Extend the test object with our custom fixtures.
export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  userManagementPage: async ({ page }, use) => {
    const userManagementPage = new UserManagementPage(page);
    await use(userManagementPage);
  },
});

export * from '@playwright/test';