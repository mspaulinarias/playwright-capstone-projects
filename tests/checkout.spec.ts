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

test('Test successfull checkout', async ({ page }) => {
 
    const loginmainpage = new login(page)
    await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')
  
    const inventory = new inventoryShoppingcard(page)
    const expectedTextItem = 'Sauce Labs Backpack'
    await inventory.verifyAddItemShoppingCard(expectedTextItem)
  
    const cardItem = new card(page)
    await cardItem.verifyOpenCheckoutInfoPage()
  
    const checkoutinfo = new checkout(page)
    await checkoutinfo.verifyFillInCheckoutInfo('Daniel', 'Parra', '5001')
    await checkoutinfo.verifyCheckSuccessfullCheckout()
   
  }); 
  
  test('Test cancel checkout', async ({ page }) => {
    
    const loginmainpage = new login(page)
    await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')
    
    const inventory = new inventoryShoppingcard(page)
    const expectedTextItem = 'Sauce Labs Backpack'
    await inventory.verifyAddItemShoppingCard(expectedTextItem)
  
    const cardItem = new card(page)
    await cardItem.verifyOpenCheckoutInfoPage()
  
    const checkoutinfo = new checkout(page)
    await checkoutinfo.verifyCancelCheckout()
  });
  
  test('Test mandatory fields checkout page', async ({ page }) => {
    
    const loginmainpage = new login(page)
    await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')
  
    const inventory = new inventoryShoppingcard(page)
    const expectedTextItem = 'Sauce Labs Backpack'
    await inventory.verifyAddItemShoppingCard(expectedTextItem)
  
    const cardItem = new card(page)
    await cardItem.verifyOpenCheckoutInfoPage()
  
    const checkoutinfo = new checkout(page)
    const expecErrorFname = "Error: First Name is required"
    const expecErrorLname = "Error: Last Name is required"
    const expectedErrorZip = "Error: Postal Code is required"
    await checkoutinfo.validateMandatoryFirstNameCheckout('Rodriguez', '6789034', expecErrorFname)
    await checkoutinfo.validateMandatoryLastNameCheckout('Anny','777111000', expecErrorLname)
    await checkoutinfo.validateMandatoryZipcodeCheckout('Daniela', 'Marin', expectedErrorZip)
  
  });
  
    test('Test checkout Overview info', async ({ page }) => { //Aqui van los expected result. 
      
      const loginmainpage = new login(page)
      await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')
    
      const inventory = new inventoryShoppingcard(page)
      const expectedTextItem = 'Sauce Labs Backpack'
      await inventory.verifyAddItemShoppingCard(expectedTextItem)
    
      const cardItem = new card(page)
      await cardItem.verifyOpenCheckoutInfoPage()
    
      const checkoutinfo = new checkout(page)
      await checkoutinfo.verifyFillInCheckoutInfo('Olivia','Mendez','567890123')
  
      //tomar esta parte como ejemplo para hacer los ajustes: van todos los expected results
      const checkoverview = new checkoutOverview(page)
      const expectedCredicard = 'SauceCard #31337' //ESTO ES NUEVO
      const expectedShippingInformation = 'Free Pony Express Delivery!' //ESTO ES NUEVO
      const expectedtotalPrice = '$29.99'
      const expectedsubtotalPrice = '$29.99'
      await checkoverview.verifyOverviewInfo(expectedCredicard, expectedShippingInformation, expectedtotalPrice, expectedsubtotalPrice) //Se llamaria verifyOverviewInfo. Se agregó esto nuevo
      
    
  });
  
  test('Test checkout complete', async ({ page }) => {
    
    const loginmainpage = new login(page)
    await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')
  
    const inventory = new inventoryShoppingcard(page)
    const expectedTextItem = 'Sauce Labs Backpack'
    await inventory.verifyAddItemShoppingCard(expectedTextItem)
  
    const cardItem = new card(page)
    await cardItem.verifyOpenCheckoutInfoPage()
  
    const checkoutinfo = new checkout(page)
    await checkoutinfo.verifyFillInCheckoutInfo('Olivia','Mendez','567890123')
  
    const checkoverview = new checkoutOverview(page)
    await checkoverview.checkFinishButton()
  
    //COMMENT: SE CAMBIÓ EL EXPECTED RESULT DIRECTO AL TEST CASE
    const checkcomplete = new checkoutComplete(page)
    const expetedOrderMessage = 'Thank you for your order!'
    const expectedDescriptionMessage = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'

    await checkcomplete.verifyOrderSuccessfullyDispatched(expetedOrderMessage, expectedDescriptionMessage)
  
  });
  
  