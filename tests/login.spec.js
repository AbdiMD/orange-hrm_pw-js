const {test, page, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/login'); 
require('dotenv').config();


test('Valid login',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.BASE_URL, process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
    await expect(page.url()).toEqual('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
});

test('Invalid login - Empty form',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.BASE_URL, '', '');
    await expect(loginPage.usernameErrorMessage).toBeVisible();
    await expect(loginPage.passwordErrorMessage).toBeVisible();
});

test('Invalid login - Invalid credentials',async ({page})=>{
    const loginPage = new LoginPage(page);
    await loginPage.login(process.env.BASE_URL, process.env.LOGIN_USERNAME, 'invalidPassword');
    await expect(loginPage.usernameErrorMessage).not.toBeVisible();
    await expect(loginPage.passwordErrorMessage).not.toBeVisible();
    await expect(loginPage.alert).toBeVisible();
    await expect(loginPage.alert).toContainText('Invalid credentials');
});
