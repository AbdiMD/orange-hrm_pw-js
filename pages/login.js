const { expect } = require("@playwright/test");


/**
 * @class LoginPage
 * @description Represents the login page and its interactions.
 */
class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole("textbox", { name: "Username" });
    this.passwordInput = page.getByRole("textbox", { name: "Password" });
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.usernameErrorMessage = page.getByText("Required").first();
    this.passwordErrorMessage = page.getByText("Required").first();
    this.alert = page.getByRole("alert");
    this.forgotPasswordLink = page.getByText("Forgot your password?");
  }

  /**
   * Performs a complete login action by navigating to the page,
   * filling credentials, and clicking the login button.
   * @param {string} base_url - The base URL of the application.
   * @param {string} username - The username to enter.
   * @param {string} password - The password to enter.
   */
  async login(base_url, username, password) {
    await this.page.goto(`${base_url}/web/index.php/auth/login`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Navigates to the login page and clicks the "Forgot your password?" link.
   * @param {string} base_url - The base URL of the application.
   */
  async goToForgotPassword(base_url) {
    await this.page.goto(`${base_url}/web/index.php/auth/login`);
    await this.forgotPasswordLink.click();
  }
}

module.exports = { LoginPage };
