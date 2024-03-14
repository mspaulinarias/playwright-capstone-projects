import { expect, type Locator, type Page } from '@playwright/test';
import exp from 'constants';

export class login {
  readonly usernameTextbox: Locator;
  readonly passwordTextbox: Locator;
  readonly loginButton: Locator;
  readonly shoppingCardIcon: Locator;
  readonly titlePage: Locator;
  readonly errormessageString: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  //test: string;
  readonly url: URL; //FIXME:como validar una URL dentro de un POM
  

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

  async loginWithCredential(username:string, password: string){ 
    await this.usernameTextbox.fill(username)
    await this.passwordTextbox.fill(password)
    await this.loginButton.click()
    //this.test = 'hola' 
  } 

  async checkSuccessfullLogin(){ 
    await expect(this.shoppingCardIcon).toBeVisible()//Se crea este método para validar el expected result de que el icono si sea visible
    await expect(this.titlePage).toHaveText('Swag Labs')

  
  //expect(this.url).toEqual('https://www.saucedemo.com/invent.html') 
  
  }

  async errorMessageLogin(){
    const expectedErrorMessage = 'Epic sadface: Username and password do not match any user in this service'
    await expect(this.errormessageString).toHaveText(expectedErrorMessage) //encontrar el texto exacto
  
  
  }
  
  async successfullLogout(){
    await this.menuButton.click()
    await this.logoutLink.click()

    await expect(this.loginButton).toBeVisible()
    
    /*FIXME: Como logro declararlo en el constructor?
    const logout = 'https://www.saucedemo.com/'
    await expect(logout).toHaveURL(logout)*/
  }
}
