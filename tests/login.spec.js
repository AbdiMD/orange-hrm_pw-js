const {test, page, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/login'); 
require('dotenv').config();

test('login page',async ({page})=>{
    const loginPage = new LoginPage(page);
    console.log(process.env.BASE_URL);
    console.log(process.env.LOGIN_USERNAME);
    console.log(process.env.LOGIN_PASSWORD);
    await loginPage.login(process.env.BASE_URL, process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
    await expect(page.url()).toEqual('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
})
