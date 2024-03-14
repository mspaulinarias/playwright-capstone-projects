import { expect, type Locator, type Page } from '@playwright/test';

import { urlToHttpOptions } from 'url';

export class checkout{
    readonly FirstNameText: Locator;
    readonly LastNameText: Locator;
    readonly ZipcodeText: Locator;
    readonly ContinueButton: Locator;
    readonly CancelButton: Locator;
    readonly CheckoutOverviewPageTitle: Locator;
    readonly YourCardTitle: Locator;
    readonly FirstNameErrorMessage: Locator;
    readonly LastNameErrorMessage: Locator;
    readonly ZipcodeErrorMessage: Locator;
    
    

  constructor(page: Page) {
    this.FirstNameText = page.getByRole('textbox', {name: 'First Name'})
    this.LastNameText = page.getByRole('textbox', {name: 'Last Name'})
    this.ZipcodeText = page.getByRole('textbox', {name: 'Zip/Postal Code'})
    this.ContinueButton = page.getByRole('button', {name: 'Continue'})
    this.CancelButton = page.getByRole('button', {name: 'Go back Cancel'})
    this.CheckoutOverviewPageTitle = page.locator('span[class="title"]')
    this.YourCardTitle = page.locator('span[class="title"]')
    this.FirstNameErrorMessage = page.getByRole('heading', {name: 'Error: First Name is required'})
    this.LastNameErrorMessage = page.locator('#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3')
    this.ZipcodeErrorMessage = page.getByRole('heading', {name: 'Error: Postal Code is required'})

    
  }

  async fillInCheckoutInfo(firstname: string, lastname: string, zipcode: string){
    await this.FirstNameText.fill(firstname)
    await this.LastNameText.fill(lastname)
    await this.ZipcodeText.fill(zipcode)
    await this.ContinueButton.click()
  }

  async checkSuccessfullCheckout(){
    await expect(this.CheckoutOverviewPageTitle).toHaveText('Checkout: Overview')
  }

  async cancelCheckout(){
    await this.CancelButton.click()
    await expect(this.YourCardTitle).toHaveText('Your Cart')
    //FIXME: Aqui el expected es que la aplicación se devuelva a la pagina de card. Como hacer este metodo que invoque a esta url?
    //await expect(console.log('https://www.saucedemo.com/cart.html'))

  }

  async validateMandatoryFirstNameCheckout(lastname: string, zipcode: string){
    await this.LastNameText.fill(lastname)
    await this.ZipcodeText.fill(zipcode)
    await this.ContinueButton.click()

    await expect(this.FirstNameErrorMessage).toHaveText("Error: First Name is required")
  }

  /* FIXME: No he logrado como encontrar el locator para estos campos, ya que no existe un id unico. solo identifica el firstname
  async validateMandatoryLastNameCheckout(firstname: string, zipcode: string){
    await this.FirstNameText.fill(firstname)
    await this.ZipcodeText.fill(zipcode)
    await this.ContinueButton.click()

    await expect(this.LastNameErrorMessage).toHaveText("Error: Last Name is required")

  
  //FIXME: No he logrado como encontrar el locator para estos campos, ya que no existe un id unico. solo identifica el firstname
  async validateMandatoryZipcodeCheckout(firstname: string, lastname: string){
    await this.FirstNameText.fill(firstname)
    await this.LastNameText.fill(lastname)
    await this.ContinueButton.click()

    await expect(this.ZipcodeErrorMessage).toHaveText("Error: Postal Code is required")

  }}*/
}