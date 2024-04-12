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

//COMMENT: SE PASARON AQUÍ ALGUNOS EXPECTED RELAIONADOS A VALIDAR UN TEXTO O UNA URL EN ESPECÍFICO.
test('Test successfull login', async ({ page }, testInfo) => { 
  
  const loginmainpage = new login(page) //Cuando abro los () estoy invocando al constructor.
  await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')
  
  const expectedInventory = '/inventory.html'
  const expectedTiltePage = 'Swag Labs'
  await loginmainpage.verifyCheckSuccessfullLogin(page, expectedInventory, expectedTiltePage)

  //Esto se encarga de tomar el screenshot y adjunta la evidencia .png. 
  await testInfo.attach('login', {
    body: await page.screenshot(),
    contentType: 'image/png'
  })

});

test('Test invalid password', async ({ page }) => {
    
    const loginmainpage = new login(page) 
    await loginmainpage.verifyLoginWithCredential('standard_user', 'incorrectPassword')

    const expectedErrorMessage = 'Epic sadface: Username and password do not match any user in this service'
    await loginmainpage.verifyErrorMessageLogin(expectedErrorMessage)
    
  });

  test('Test logout', async ({ page }) => {
    
    const loginmainpage = new login(page) 
    await loginmainpage.verifyLoginWithCredential('standard_user', 'secret_sauce')
    await loginmainpage.verifySuccessfullLogout()
    

}); 
