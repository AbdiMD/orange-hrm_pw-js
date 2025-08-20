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
  //check if the punch out is not done, the punch in first
  if (await dashboardPage.getInButton.isVisible()) {
    await dashboardPage.note.fill("Test note for testing Orange HRM");
    await dashboardPage.clickInButton();
    // await expect(dashboardPage.page).toHaveURL(/\/attendance\/punchOut$/);
  }
});

test("Click Out button", async ({ dashboardPage }) => {
  await dashboardPage.clickStopwatchButton();
  await dashboardPage.note.fill("Test note for testing Orange HRM");
  if (await dashboardPage.getInButton.isVisible()) {
    await dashboardPage.clickInButton();
  }
  await dashboardPage.clickOutButton();
  // await expect(dashboardPage.page).toHaveURL(/\/attendance\/punchIn$/);
});

//Click Candidate to Interview button on My Actions card in dashboard
test("Click Candidate to Interview button", async ({ dashboardPage }) => {
  await dashboardPage.clickMyActionsButton();
  // await expect(dashboardPage.page).toHaveURL(/\/recruitment\/viewCandidates?statusId=4$/);
});

test("Click Vacancies tab", async ({ page, dashboardPage }) => {
  await dashboardPage.clickMyActionsButton({ timeout: 15000 });
  await dashboardPage.clickVacanciesButton();
  // await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy");
});

//Click Assign leave button on the Quick Launch card in dashboard

test("Click Assign Leave button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickAssignLeaveButton();
  // await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/leave/assignLeave");
});

test("Click Leave List button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickLeavelistButton();
  // await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewLeaveList");
});

test("Click Timesheets button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickTimeSheetButton();
  // await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/time/viewEmployeeTimesheet");
});

test("Click Apply Leave button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickApplyLeaveButton();
  // await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/leave/applyLeave");
});

test("Click My Leave button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickMyLeaveButton();
  // await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/leave/viewMyLeaveList");
});

test("Click My Timesheet button", async ({ page, dashboardPage }) => {
  await dashboardPage.clickMyTimesheetButton();
  // await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/time/viewMyTimesheet");
});
