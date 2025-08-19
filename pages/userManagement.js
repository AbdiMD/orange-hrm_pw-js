class UserManagementPage {
  constructor(page) {
    this.page = page;

    // front page
    this.addUserButton = page.locator("button:has-text('Add')");

    // add user form
    this.userRoleDropdown = page.locator("form i").first();
    this.employeeNameInput = page.locator('input[placeholder="Type for hints..."]');
    this.statusDropdown = page.locator("form i").nth(1);
    this.usernameInput = page.getByRole("textbox").nth(2);
    this.passwordInput = page.getByRole("textbox").nth(3);
    this.confirmPasswordInput = page.getByRole("textbox").nth(4);
    this.saveButton = page.locator('button:has-text("Save")');
  }

  async goToUserManagement() {
    await this.page.goto(`${process.env.BASE_URL}/web/index.php/admin/viewSystemUsers`);
  }
    
  async clickAddUserButton() {
    await this.addUserButton.click();
  }

  async addUser(role, status, username, password, confirmPassword) {
    await this.userRoleDropdown.click();
    await this.page.getByRole('option', {name: role}).click();
    await this.employeeNameInput.fill("a");
    await this.page.getByText('Searching...').waitFor({ state: 'visible' });
    await this.page.getByText('Searching...').waitFor({ state: 'hidden' });
    await this.page.getByRole('option').first().click();
    await this.statusDropdown.click();
    await this.page.getByRole('option', {name: status}).click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle'); // Wait for the save action to complete
  }

  async searchUser(username) {
    const searchInput = await this.page.getByRole('textbox').nth(1);
    await searchInput.fill(username);
    await this.page.getByRole('button', { name: 'Search' }).click();
    await this.page.waitForLoadState('networkidle'); // Wait for the search results to load
  }
}

module.exports = { UserManagementPage };