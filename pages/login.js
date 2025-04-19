const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.usernameErrorMessage = page.getByText('Required').first();
    this.passwordErrorMessage = page.getByText('Required').first();
    this.alert = page.getByRole('alert');
  }

  async login(base_url,username, password) {
    await this.page.goto(`${base_url}/web/index.php/auth/login`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = {LoginPage};