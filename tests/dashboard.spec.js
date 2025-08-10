const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login");
const { DashboardPage } = require("../pages/dashboard");
require("dotenv").config();

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.BASE_URL, process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
});

test("Click stopwatch button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  if (await dashboardPage.getStopwatchButton.isVisible()) {
    await dashboardPage.clickStopwatchButton();
    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/attendance/punchIn");
  }
});

test("Add note", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.clickStopwatchButton();
  await dashboardPage.note.fill("Test note for testing Orange HRM");
  await expect(dashboardPage.note).toHaveValue("Test note for testing Orange HRM");
});

test("Click In button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.clickStopwatchButton();

  //check if the punch out is not done, the punch in first
  if (await dashboardPage.getInButton.isVisible()) {
    await dashboardPage.note.fill("Test note for testing Orange HRM");
    await dashboardPage.clickInButton();

    await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/attendance/punchOut");
  }
});

test("Click Out button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.clickStopwatchButton();
  await dashboardPage.note.fill("Test note for testing Orange HRM");

  if (await dashboardPage.getInButton.isVisible()) {
    await dashboardPage.clickInButton();
  }

  await dashboardPage.clickOutButton();

  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/attendance/punchIn");
});
