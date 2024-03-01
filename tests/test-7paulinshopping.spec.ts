import { test, expect } from '@playwright/test';
import { error } from 'console';
import exp from 'constants';

test('Test Successfull login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')

  await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
  await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
  await page.getByRole('button', {name: 'Login'}).click()

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Swag Labs')
  //paulin comment
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  
});

test('Test invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name: 'Password'}).fill('amadeus')
    await page.getByRole('button', {name: 'Login'}).click()

    //FIXME: Como hago para localizar este elemento que es un mensaje de error.
    const locator = page.locator('//h3[@data-test="error"]')
    const expectedErrorMessage = 'Epic sadface: Username and password do not match any user in this service'
    await expect(locator).toHaveText(expectedErrorMessage) //encontrar el texto exacto
    
  });

  test('Test logout', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    await page.getByRole('button', {name: 'Open Menu'}).click()
    await page.getByRole('link', { name: 'Logout' }).click()

    await expect(page).toHaveURL('https://www.saucedemo.com/')

}); 

test('Test adding an item to a shopping card', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
  await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
  await page.getByRole('button', {name: 'Login'}).click()

  const itemnameInShoppoingCard = '//*[@id="item_4_title_link"]' //cambiar este por un css selector valido.
  expect(page.locator(itemnameInShoppoingCard)).toBeVisible()

  await page.locator('//*[@id="add-to-cart-sauce-labs-backpack"]').click()
  await page.locator('//*[@id="shopping_cart_container"]/a').click()

  //let itemtest = 123: el let cambia de valor.
  //FIXME: XPATH LOCATOR
  const locator = page.locator(itemnameInShoppoingCard)
  await expect(locator).toHaveText('Sauce Labs Backpack')

}); 

test('Test removing an item from shopping cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
  await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
  await page.getByRole('button', {name: 'Login'}).click()

  await page.locator('//*[@id="add-to-cart-sauce-labs-backpack"]').click()
  await page.locator('//*[@id="shopping_cart_container"]/a').click()

  expect (page.getByRole('button', {name: 'Remove'})).toBeVisible()

  await page.getByRole('button', {name: 'Remove'}).click()

  //FIXME: si se desea validar que un elemento ya no aparezca luego de ser removido, este seria la forma correcta? .not.toBevisible
  // Adicional, si se desea validar el conteo del carrito de compras, cada ve que se remueve un item, lo haría mediante un
  expect (page.locator('//*[@id="add-to-cart-sauce-labs-backpack"]')).not.toBeVisible()

}); 

//agregar mas de un elemento al carrito y validar que la cantidad corresponda igual



