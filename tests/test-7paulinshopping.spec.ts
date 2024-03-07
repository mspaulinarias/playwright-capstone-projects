import { test, expect } from '@playwright/test';
import { error } from 'console';
import exp from 'constants';
import { login } from './src/login';
import { inventoryShoppingcard } from './src/inventoryShoppingCard';

test('Test Successfull login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/') //FIXME:Como hago para llevar esta url al constructor? 
  const loginmainpage = new login(page) //Cuando abro los () estoy invocando al constructor.
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')
  await loginmainpage.checkSuccessfullLogin()
  
});

test('Test invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/') 
    const loginmainpage = new login(page) //Cuando abro los () estoy invocando al constructor.
    await loginmainpage.loginWithCredential('standard_user', 'incorrectPassword')
    await loginmainpage.errorMessageLogin()
    
  });

  test('Test logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')//FIXME:Como hago para llevar esta url al constructor? 
    const loginmainpage = new login(page) //Cuando abro los () estoy invocando al constructor.
    await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')
    await loginmainpage.successfullLogout()

}); 

test('Test adding an item to a shopping card', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginmainpage = new login(page) 
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

}); 

test('Test removing an item from shopping cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginmainpage = new login(page) //Cuando abro los () estoy invocando al constructor.
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()
  await inventory.removeItemShoppingcard()

}); 

//agregar mas de un elemento al carrito y validar que la cantidad corresponda igual



