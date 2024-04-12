import { expect, type Locator, type Page } from '@playwright/test';
import { AssertionError } from 'assert';
import { error } from 'console';
import exp from 'constants';
import { Url } from 'url';

export class login { //todas las clases los nombres inician con mayuscula corregir
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;
  readonly shoppingCardIcon: Locator;
  readonly titlePage: Locator;
  readonly errormessageString: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  //test: string;
  


  constructor(page: Page, test = 'hola test') {

        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button', {name: 'Login'})

        this.shoppingCardIcon = page.locator('.shopping_cart_link')
        this.titlePage = page.locator("div[class='app_logo']") 
        this.errormessageString = page.locator('//h3[@data-test="error"]')

        this.menuButton = page.getByRole('button', {name: 'Open Menu'})
        this.logoutLink = page.getByRole('link', { name: 'Logout' })

  
  }

  async verifyLoginWithCredential(username:string, password: string){ 
    await this.usernameTextbox.fill(username)
    await this.passwordTextbox.fill(password)
    await this.loginButton.click()
    //this.test = 'hola' 
  } 

  async verifyCheckSuccessfullLogin(page: Page,  expectedInventory: string, expectedTiltePage: string,){ //Aqui ordenar los pasos url, carrito y title. 
    await expect(this.shoppingCardIcon).toBeVisible()//Se crea este método para validar el expected result de que el icono si sea visible
    await expect(this.titlePage).toHaveText(expectedTiltePage) 
    //COMMENT: Aqui valido que ingrese a la url correcta de inventory. Revisar si esta lógica esta bien. funciona el caso de prueba
    await expect(page).toHaveURL(expectedInventory) //hace un partial match de la url


  }

  async verifyErrorMessageLogin(expectedErrorMessage: string){
    await expect(this.errormessageString).toHaveText(expectedErrorMessage) //encontrar el texto exacto
  
    
  }
  
  async verifySuccessfullLogout(){
    await this.menuButton.click()
    await this.logoutLink.click()

    await expect(this.loginButton).toBeVisible()
    
    
  }
}
