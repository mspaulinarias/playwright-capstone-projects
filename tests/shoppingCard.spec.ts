import { test, expect } from '@playwright/test';
import { assert, error } from 'console';
import exp from 'constants';
import { login } from '../src/login';
import { inventoryShoppingcard } from '../src/inventoryShoppingCard';
import { url } from 'inspector';
import { card } from '../src/card';
import { checkout } from '../src/checkout';
import { checkoutOverview } from '../src/checkoutOverview';
import { checkoutComplete } from '../src/checkoutComplete';

test.beforeEach(async ({page})=> {
  await page.goto('/')
})

//COMMENT: SE AJUSTÓ EL EXPECTED RESULT, ANEXANDOSE DESDE AQUÍ
test('Test adding an item to a shopping card', async ({ page }) => {
  
  const loginmainpage = new login(page) 
  await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  const expectedTextItem = 'Sauce Labs Backpack'
  await inventory.verifyAddItemShoppingCard(expectedTextItem)

}); 

test('Test removing an item from shopping cart', async ({ page }) => {
  
  const loginmainpage = new login(page)
  await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  const expectedTextItem = 'Sauce Labs Backpack'
  await inventory.verifyAddItemShoppingCard(expectedTextItem)
  await inventory.removeItemShoppingcard()

}); 

test('Test card in shopping cart', async ({ page }) => {
  
  const loginmainpage = new login(page)
  await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  const expectedTextItem = 'Sauce Labs Backpack'
  await inventory.verifyAddItemShoppingCard(expectedTextItem)

  const cardItem = new card(page)
  const expectedItemdesc = 'Sauce Labs Backpack'
  await cardItem.verifyCheckItemCard(expectedItemdesc)
 
});
 

