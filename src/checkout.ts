import { expect, type Locator, type Page } from '@playwright/test';

import { urlToHttpOptions } from 'url';

export class checkout{ 
    readonly firstNameText: Locator; 
    readonly lastNameText: Locator;
    readonly zipcodeText: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;
    readonly checkoutOverviewPageTitle: Locator;
    readonly yourCardTitle: Locator;
    readonly firstNameErrorMessage: Locator;
    readonly lastNameErrorMessage: Locator;
    readonly zipcodeErrorMessage: Locator;
    readonly errorMessage: Locator;
    readonly page: Page;
    readonly closeButton: Locator;

  constructor(page: Page) {
    this.firstNameText = page.getByRole('textbox', {name: 'First Name'})
    this.lastNameText = page.getByRole('textbox', {name: 'Last Name'})
    this.zipcodeText = page.getByRole('textbox', {name: 'Zip/Postal Code'})
    this.continueButton = page.getByRole('button', {name: 'Continue'})
    this.cancelButton = page.getByRole('button', {name: 'Go back Cancel'})
    this.checkoutOverviewPageTitle = page.locator('span[class="title"]')
    this.yourCardTitle = page.locator('span[class="title"]')
    
    this.errorMessage = page.locator('h3[data-test="error"]')
    this.page = page
    this.closeButton = page.locator('button[class="error-button"]')
  }

  async fillInCheckoutInfo(firstname: string, lastname: string, zipcode: string){
    await this.firstNameText.fill(firstname)
    await this.lastNameText.fill(lastname)
    await this.zipcodeText.fill(zipcode)
    await this.continueButton.click()
  }

  async checkSuccessfullCheckout(){
    await expect(this.checkoutOverviewPageTitle).toHaveText('Checkout: Overview')
  }

  async cancelCheckout(){
    await this.cancelButton.click()
    await expect(this.yourCardTitle).toHaveText('Your Cart')
    await expect(this.page).toHaveURL('/cart.html')

  }

  async validateMandatoryFirstNameCheckout(lastname: string, zipcode: string){
    await this.lastNameText.fill(lastname)
    await this.zipcodeText.fill(zipcode)
    await this.continueButton.click()

    await expect(this.errorMessage).toHaveText("Error: First Name is required")
  }

  //COMMENT: Aqui ya se arregló primero se limpian los campos y luego se da click en el boton "x" parar borrar el msg error anterior
  async validateMandatoryLastNameCheckout(firstname: string, zipcode: string){
    await this.lastNameText.clear()
    await this.closeButton.click()
   
    await this.firstNameText.fill(firstname)
    await this.zipcodeText.fill(zipcode)
    await this.continueButton.click()

    await expect(this.errorMessage).toHaveText("Error: Last Name is required")

  }  
  
  async validateMandatoryZipcodeCheckout(firstname: string, lastname: string){
    await this.zipcodeText.clear()
    await this.closeButton.click()

    await this.firstNameText.fill(firstname)
    await this.lastNameText.fill(lastname)
    await this.continueButton.click()

    await expect(this.errorMessage).toHaveText("Error: Postal Code is required")

  }
}
