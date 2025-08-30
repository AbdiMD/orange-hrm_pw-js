const { test, expect } = require("../fixtures");
const fs = require("fs");

test.beforeEach(async ({ page }) => {
  const cookies = JSON.parse(fs.readFileSync("cookie.json", "utf-8"));
  await page.context().addCookies(cookies);
  await page.goto(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
});

test("Click stopwatch button", async ({ dashboardPage }) => {
  await dashboardPage.clickStopwatchButton();
});

test("Add note", async ({ dashboardPage }) => {
  await dashboardPage.clickStopwatchButton();
  await dashboardPage.note.fill("Test note for testing Orange HRM");
  await expect(dashboardPage.note).toHaveValue("Test note for testing Orange HRM");
});

test("Click In button", async ({ dashboardPage }) => {
  await dashboardPage.clickStopwatchButton();
  await dashboardPage.note.fill("Test note for testing Orange HRM");

  //check if the punch out is not done, the punch in first
  if (await dashboardPage.inButton.isVisible()) {
    await dashboardPage.note.fill("Test note for testing Orange HRM");
    await dashboardPage.clickInButton();
  }
});

test("Click Out button", async ({ dashboardPage, page }) => {
  await expect(dashboardPage.stopwatchButton).toBeVisible();
  await dashboardPage.clickStopwatchButton();
  await dashboardPage.note.fill("Test note for testing Orange HRM");
  if (await dashboardPage.inButton.isVisible()) {
    await dashboardPage.clickInButton();
    await dashboardPage.clickOutButton.waitFor({ state: "visible" });
  }
  await dashboardPage.clickOutButton();
});

//Click Candidate to Interview button on My Actions card in dashboard
test("Click Candidate to Interview button", async ({ dashboardPage }) => {
  await dashboardPage.clickMyActionsButton();
});

test("Click Vacancies tab", async ({ page, dashboardPage }) => {
  await dashboardPage.clickMyActionsButton();
  await dashboardPage.clickVacanciesButton();
});

//Click Assign leave button on the Quick Launch card in dashboard
test("Click Assign Leave button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickAssignLeaveButton();
});

test("Click Leave List button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickLeavelistButton();
});

test("Click Timesheets button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickTimeSheetButton();
});

test("Click Apply Leave button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickApplyLeaveButton();
});

test("Click My Leave button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickMyLeaveButton();
});

test("Click My Timesheet button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickMyTimesheetButton();
});
