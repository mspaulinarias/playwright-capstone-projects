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

test('Test successfull login', async ({ page }) => {
  
  const loginmainpage = new login(page) //Cuando abro los () estoy invocando al constructor.
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')
  await loginmainpage.checkSuccessfullLogin(page)


});

test('Test invalid password', async ({ page }) => {
    
    const loginmainpage = new login(page) 
    await loginmainpage.loginWithCredential('standard_user', 'incorrectPassword')
    await loginmainpage.errorMessageLogin()
    
  });

  test('Test logout', async ({ page }) => {
    
    const loginmainpage = new login(page) 
    await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')
    await loginmainpage.successfullLogout()
    

}); 

test('Test adding an item to a shopping card', async ({ page }) => {
  
  const loginmainpage = new login(page) 
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

}); 

test('Test removing an item from shopping cart', async ({ page }) => {
  
  const loginmainpage = new login(page)
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()
  await inventory.removeItemShoppingcard()

}); 

test('Test card in shopping cart', async ({ page }) => {
  
  const loginmainpage = new login(page)
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

  const cardItem = new card(page)
  await cardItem.checkItemCard()
 
});
 
//DUDA: cuando tengo un escenario como este, cierto que deberia invocar previo todos los metodos relacionados a la compra y luego
//crear el método ppal que en este caso sería hacer un checkout?
test('Test successfull checkout', async ({ page }) => {
 
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
  
  const loginmainpage = new login(page)
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

  const cardItem = new card(page)
  await cardItem.openCheckoutInfoPage()

  const checkoutinfo = new checkout(page)
  await checkoutinfo.validateMandatoryFirstNameCheckout('Rodriguez', '6789034')
  await checkoutinfo.validateMandatoryLastNameCheckout('Anny','777111000')
  await checkoutinfo.validateMandatoryZipcodeCheckout('Daniela', 'Marin')

});

  test('Test checkout Overview info', async ({ page }) => {
    
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
  
  const loginmainpage = new login(page)
  await loginmainpage.loginWithCredential('standard_user', 'secret_sauce')

  const inventory = new inventoryShoppingcard(page)
  await inventory.selectItemShoppingCard()

  const cardItem = new card(page)
  await cardItem.openCheckoutInfoPage()

  const checkoutinfo = new checkout(page)
  await checkoutinfo.fillInCheckoutInfo('Olivia','Mendez','567890123')

  const checkoverview = new checkoutOverview(page)
  await checkoverview.checkFinishButton()

  const checkcomplete = new checkoutComplete(page)
  await checkcomplete.orderSuccessfullyDispatched()

});

