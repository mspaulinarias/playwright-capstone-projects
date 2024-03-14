import { test, expect } from '@playwright/test';
import { error } from 'console';
import exp from 'constants';
import { login } from '../src/login';
import { inventoryShoppingcard } from '../src/inventoryShoppingCard';
import { url } from 'inspector';
import { card } from '../src/card';
import { checkout } from '../src/checkout';
import { checkoutOverview } from '../src/checkoutOverview';
import { checkoutComplete } from '../src/checkoutComplete';

test('Test successfull login', async ({ page }) => {
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
    const loginmainpage = new login(page) 
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

test('Test card in shopping cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginmainpage = new login(page)
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

  const cardItem = new card(page)
  await cardItem.checkItemCard()
 
});
 
//DUDA: cuando tengo un escenario como este, cierto que deberia invocar previo todos los metodos previos relacionados a la compra y luego
//crear el método ppal que en este caso sería hacer un checkout?
test('Test successfull checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginmainpage = new login(page)
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

  const cardItem = new card(page)
  await cardItem.openCheckoutInfoPage()

  const checkoutinfo = new checkout(page)
  await checkoutinfo.fillInCheckoutInfo('Daniel', 'Parra', '5001')
  await checkoutinfo.checkSuccessfullCheckout()
 
}); 

test('Test cancel checkout', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginmainpage = new login(page)
  
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')
  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

  const cardItem = new card(page)
  await cardItem.openCheckoutInfoPage()

  const checkoutinfo = new checkout(page)
  await checkoutinfo.cancelCheckout()
});

test('Test mandatory fields checkout page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginmainpage = new login(page)
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

  const cardItem = new card(page)
  await cardItem.openCheckoutInfoPage()

  const checkoutinfo = new checkout(page)
  await checkoutinfo.validateMandatoryFirstNameCheckout('Rodriguez', '6789034')
  //await checkoutinfo.validateMandatoryLastNameCheckout('Anny','777111000')
  //await checkoutinfo.validateMandatoryZipcodeCheckout('Daniela', 'Marin')

});

  test('Test checkout Overview info', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    const loginmainpage = new login(page)
    await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')
  
    const inventory = new inventoryShoppingcard(page)
    await inventory.selectItemShoppingCard()
  
    const cardItem = new card(page)
    await cardItem.openCheckoutInfoPage()
  
    const checkoutinfo = new checkout(page)
    await checkoutinfo.fillInCheckoutInfo('Olivia','Mendez','567890123')

    const checkoverview = new checkoutOverview(page)
    await checkoverview.checkoutOverviewInfo()
  
});

test('Test checkout complete', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')
  const loginmainpage = new login(page)
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

  const cardItem = new card(page)
  await cardItem.openCheckoutInfoPage()

  const checkoutinfo = new checkout(page)
  await checkoutinfo.fillInCheckoutInfo('Olivia','Mendez','567890123')

  const checkoverview = new checkoutOverview(page)
  await checkoverview.checkfinishButton()

  const checkcomplete = new checkoutComplete(page)
  await checkcomplete.OrderSuccessfullyDispatched()

});

