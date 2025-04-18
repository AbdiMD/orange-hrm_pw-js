const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(base_url,username, password) {
    await this.page.goto(`${base_url}/web/index.php/auth/login`);
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username)
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password)
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}

module.exports = {LoginPage};