const { expect } = require("@playwright/test");
const { TIMEOUT } = require("dns");

class DashboardPage {
  constructor(page) {
    this.page = page;

    //Time at work
    this.getStopwatchButton = page.locator("//i[@class='oxd-icon bi-stopwatch']");
    this.note = page.locator("//textarea[@placeholder='Type here']");
    this.getInButton = page.getByRole("button", { name: "In", exact: true });
    this.getOutButton = page.getByRole("button", { name: "Out", exact: true });

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
    await expect(this.getStopwatchButton).toBeVisible();
    await this.getStopwatchButton.click();
  }

  async addNote(note) {
    await expect(this.note).toBeVisible();
    await this.note.fill(note);
    await expect(this.note).toHaveValue(note);
  }

  async clickInButton() {
    await expect(this.getInButton).toBeVisible();
    await this.getInButton.click();
    await expect(this.page).toHaveURL(/\/attendance\/punchOut$/);
  }

  async clickOutButton() {
    await expect(this.getOutButton).toBeVisible();
    await this.getOutButton.click();
    await expect(this.page).toHaveURL(/\/attendance\/punchIn(?:\?.*)?$/);
    await expect(this.page.getByRole("heading", { name: "Vacancies" })).toBeVisible();
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
    await this.getVacanciesButton.click();
    await this.page.waitForURL(/\recruitment\/viewJobVacancy$/);
  }

  //Quick Launch
  async clickAssignLeaveButton() {
    await this.getAssignLeaveButton.click();
    await this.page.waitForURL(/\/leave\/assignLeave$/);
  }

  async clickLeavelistButton() {
    await this.getLeavelistButton.click();
    await this.page.waitForURL(/\/leave\/viewLeaveList$/);
  }

  async clickTimeSheetButton() {
    await this.getTimeSheetButton.click();
    await this.page.waitForURL(/\/time\/viewEmployeeTimesheet$/);
  }

  async clickApplyLeaveButton() {
    await this.getApplyLeaveButton.click();
    await this.page.waitForURL(/\/leave\/applyLeave$/);
  }

  async clickMyLeaveButton() {
    await this.getMyLeaveButton.click();
    await this.page.waitForURL(/\/leave\/viewMyLeaveList$/);
  }

  async clickMyTimesheetButton() {
    await this.getMyTimesheetButton.click();
    await this.page.waitForURL(/\/time\/viewMyTimesheet$/);
  }
}

module.exports = { DashboardPage };
