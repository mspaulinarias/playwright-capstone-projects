import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjectmodel/loginPage';
import dotenv from 'dotenv'
dotenv.config()

//Aqui vamos a probar en diferentes ambientes, ya sea QA o DEV
test('Test login in QA env', async ({ page }) => {
  
  await page.goto(process.env.SAUCEDEMOURL)
  const login = new LoginPage(page) 
  await login.loginWithCredentials(process.env.SAUCEDEMOUSER, process.env.SAUCEDEMOPASS)
  await login.checkSuccessfullLogin()

});