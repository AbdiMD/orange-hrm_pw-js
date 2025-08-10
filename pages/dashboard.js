const { TIMEOUT } = require("dns");

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.getStopwatchButton = page.locator("//i[@class='oxd-icon bi-stopwatch']");
    this.note = page.locator("//textarea[@placeholder='Type here']");
    this.getInButton = page.getByRole("button", { name: "In", exact: true });
    this.getOutButton = page.getByRole("button", { name: "Out", exact: true });
  }

  async clickStopwatchButton() {
    await this.getStopwatchButton.waitFor({ state: "visible" });
    await this.getStopwatchButton.click();
    // await this.page.waitForURL("**/attendance/punchIn");
  }

  async addNote(note) {
    await this.note.fill(note);
  }

  async clickInButton() {
    await this.getInButton.click();
    await this.page.waitForURL("**/attendance/punchOut");
  }

  async clickOutButton() {
    await this.getOutButton.click();
    await this.page.waitForURL("**/attendance/punchIn");
  }
}

module.exports = { DashboardPage };
