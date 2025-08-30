import { test as base } from "@playwright/test";
import { LoginPage } from "./pages/login";
import { UserManagementPage } from "./pages/userManagement";
import { DashboardPage } from "./pages/dashboard";

// Define the custom fixtures with a TypeScript interface.
interface CustomFixtures {
  loginPage: LoginPage;
  userManagementPage: UserManagementPage;
  dashboardPage: DashboardPage;
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

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export * from "@playwright/test";
