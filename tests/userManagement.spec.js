import {test, expect} from "../fixtures";
const fs = require("fs");

test.beforeEach(async ({page, userManagementPage}) => {
  const cookie = fs.readFileSync("cookie.json", "utf-8");
  const cookies = JSON.parse(cookie);
  await page.context().addCookies(cookies);
});
test("Add user", async ({page, userManagementPage}) => {
  await userManagementPage.goToUserManagement();
  await userManagementPage.clickAddUserButton();
  await page.waitForLoadState('load');
  
  const role = "Admin";
  const status = "Enabled";
  const username = "newuser";
  const password = "G0ogle.com12";
  const confirmPassword = "G0ogle.com12";

  await userManagementPage.addUser(role, status, username, password, confirmPassword);
  
  // Verify that the user was added successfully
  await page.getByRole('heading', { name: 'System Users' }).waitFor({ state: 'visible' });
  await expect(page).toHaveURL(`${process.env.BASE_URL}/web/index.php/admin/viewSystemUsers`);

  await userManagementPage.searchUser(username);
  await expect(page.locator(`text=${username}`)).toBeVisible();
});