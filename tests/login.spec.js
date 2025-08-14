import { test, expect } from "../fixtures";
const fs = require("fs");

test("Valid login", async ({ page, loginPage }) => {
  await loginPage.login(process.env.BASE_URL, process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
  await expect(page).toHaveURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);

  // Save cookies to a file
  const cookie = await page.context().cookies();
  const cookieString = JSON.stringify(cookie);
  fs.writeFileSync("cookie.json", cookieString);
});

test("Invalid login - Empty form", async ({ loginPage }) => {
  await loginPage.login(process.env.BASE_URL, "", "");
  await expect(loginPage.usernameErrorMessage).toBeVisible();
  await expect(loginPage.passwordErrorMessage).toBeVisible();
});

test("Invalid login - Invalid credentials", async ({ loginPage }) => {
  await loginPage.login(process.env.BASE_URL, process.env.LOGIN_USERNAME, "invalidPassword");
  await expect(loginPage.usernameErrorMessage).not.toBeVisible();
  await expect(loginPage.passwordErrorMessage).not.toBeVisible();
  await expect(loginPage.alert).toBeVisible();
  await expect(loginPage.alert).toContainText("Invalid credentials");
});

test("Forgot password link", async ({ page, loginPage }) => {
  await loginPage.goToForgotPassword(process.env.BASE_URL);
  await expect(page).toHaveURL(`${process.env.BASE_URL}/web/index.php/auth/requestPasswordResetCode`);
});
