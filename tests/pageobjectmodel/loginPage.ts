import { Locator, Page, expect } from "@playwright/test"

export class LoginPage{

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCardIcon: Locator

    constructor(page: Page){ //El código siempre va a venir a ejecutar primero el constructor

        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button', {name: 'Login'})
        this.shoppingCardIcon = page.locator('.shopping_cart_link')
    }
//Por cada uno de los elementos, vamos a crear la iteracción con los elementos. 

    async fillUsername(username: string){
        await this.usernameTextbox.fill(username)
    }

    async fillPassword(password: string){
        await this.passwordTextbox.fill(password)
    }

    async clickOnlogin(){
        await this.loginButton.click()
    }

    //Vamos a mejorarlo, haciendo todo el recorrido del login en un solo método.
    //Ya lo de arriba, sobraría (los 3 métodos en la parte de arriba, que estan por separado en el async). 
    
    async loginWithCredentials(username:string, password: string){ //vamos a entrar los dos parametros en ()
        //Aqui adentro, voy a hacer todo lo relacionado al login. Aqui agrupamos todo en un solo método
        await this.fillUsername(username)
        await this.fillPassword(password)
        await this.clickOnlogin()
    } 

    async checkSuccessfullLogin(){ //Se crea este método para validar el expected result de que el icono si sea visible
        await expect(this.shoppingCardIcon).toBeVisible()
    }


}