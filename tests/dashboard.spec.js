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

//Click Candidate to Interview button on My Actions card in dashboard
test("Click My Actions button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickMyActionsButton();
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates?statusId=4");
});

test("Click Vacancies tab", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickMyActionsButton({ timeout: 15000 });
  await dashboardPage.clickVacanciesButton();
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy");
});

//Click Assign leave button on the Quick Launch card in dashboard

test("Click Assign Leave button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickAssignLeaveButton();
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/leave/assignLeave");
});

test("Click Leave List button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickLeavelistButton();
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList");
});

test("Click Timesheets button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickTimeSheetButton();
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet");
});

test("Click Apply Leave button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickApplyLeaveButton();
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave");
});

test("Click My Leave button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickMyLeaveButton();
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList");
});

test("Click My Timesheet button", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.clickMyTimesheetButton();
  await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/time/viewMyTimesheet");
});
