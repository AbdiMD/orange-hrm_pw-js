const { expect } = require("@playwright/test");
const { TIMEOUT } = require("dns");

class DashboardPage {
  constructor(page) {
    this.page = page;

    //Time at work
    // this.getStopwatchButton = page.locator("//i[@class='oxd-icon bi-stopwatch']");
    // this.note = page.locator("//textarea[@placeholder='Type here']");
    // this.getInButton = page.getByRole("button", { name: "In", exact: true });
    // this.getOutButton = page.getByRole("button", { name: "Out", exact: true });
    this.stopwatchButton = page.locator("button:has(i.oxd-icon.bi-stopwatch)");
    this.note = page.getByPlaceholder("Type here");
    this.inButton = page.getByRole("button", { name: /^In$/ });
    this.outButton = page.getByRole("button", { name: /^Out$/ });
    this.errorMessage = page.getByText("Overlapping Records Found");

    //My Actions
    this.getMyActionsButton = page.getByText("(1) Candidate to Interview");
    this.getCandidatesButton = page.getByRole("link", { name: "Candidates" });
    this.getVacanciesButton = page.getByRole("link", { name: "Vacancies" });

    //Quick Launch
    this.getAssignLeaveButton = page.getByRole("button", { name: "Assign Leave" });
    this.getLeavelistButton = page.getByRole("button", { name: "Leave List" });
    this.getTimeSheetButton = page.getByRole("button", { name: "Timesheets" });
    this.getApplyLeaveButton = page.getByRole("button", { name: "Apply Leave" });
    this.getMyLeaveButton = page.getByRole("button", { name: "My Leave" });
    this.getMyTimesheetButton = page.getByRole("button", { name: "My Timesheet" });
  }

  //Time at work card

  async clickStopwatchButton() {
    // await expect(this.getStopwatchButton).toBeVisible();
    await this.stopwatchButton.click();
  }

  async addNote(note) {
    await expect(this.note).toBeVisible();
    await this.note.fill(note);
    await expect(this.note).toHaveValue(note);
  }

  async clickInButton() {
    await expect(this.inButton).toBeVisible();
    await this.inButton.click();
    await expect(this.page).toHaveURL(/\/attendance\/punchOut/, { timeout: 30000 });
  }

  async clickOutButton() {
    await expect(this.outButton).toBeVisible();
    await this.outButton.click();
    await expect(this.page).toHaveURL(/\/attendance\/punchIn/, { timeout: 30000 });
  }

  // My Actions card
  async clickMyActionsButton() {
    await expect(this.getMyActionsButton).toBeVisible();
    await this.getMyActionsButton.click();
    await expect(this.page).toHaveURL(/\/recruitment\/viewCandidates(?:\?.*statusId=4)?/);
    await expect(this.page.getByRole("heading", { name: "Candidates" })).toBeVisible();
  }

  async clickCandidatesButton() {
    await this.getCandidatesButton.click();
  }

  async clickVacanciesButton() {
    await expect(this.getVacanciesButton).toBeVisible();
    await this.getVacanciesButton.click();
    await expect(this.page).toHaveURL(/recruitment\/viewJobVacancy/, { timeout: 30000 });
    await expect(this.page.getByRole("heading", { name: "Vacancies" })).toBeVisible();
  }

  //Quick Launch
  async clickAssignLeaveButton() {
    await this.getAssignLeaveButton.click();
    await expect(this.page).toHaveURL(/\/leave\/assignLeave$/);
  }

  async clickLeavelistButton() {
    await this.getLeavelistButton.click();
    await expect(this.page).toHaveURL(/\/leave\/viewLeaveList$/);
  }

  async clickTimeSheetButton() {
    await this.getTimeSheetButton.click();
    await expect(this.page).toHaveURL(/\/time\/viewEmployeeTimesheet$/);
  }

  async clickApplyLeaveButton() {
    await this.getApplyLeaveButton.click();
    await expect(this.page).toHaveURL(/\/leave\/applyLeave$/);
  }

  async clickMyLeaveButton() {
    await this.getMyLeaveButton.click();
    await expect(this.page).toHaveURL(/\/leave\/viewMyLeaveList$/);
  }

  async clickMyTimesheetButton() {
    await this.getMyTimesheetButton.click();
    await expect(this.page).toHaveURL(/\/time\/viewMyTimesheet$/);
  }
}

module.exports = { DashboardPage };
