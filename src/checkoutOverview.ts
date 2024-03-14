import { expect, type Locator, type Page } from '@playwright/test';

export class checkoutOverview{
    readonly PaymentInformationText: Locator;
    readonly ShippingInformationText: Locator;
    readonly PriceTotalText: Locator;
    readonly SauceCardText: Locator;
    readonly FreePonyExpressText: Locator;
    readonly FinishButton: Locator;
    
    

  constructor(page: Page) {
    //FIXME: Ayuda con los localizadores, cuando tenemos varios elementos de tipo class que son iguales.
    this.PaymentInformationText = page.locator('#checkout_summary_container > div > div.summary_info > div:nth-child(1)')
    this.ShippingInformationText = page.locator('#checkout_summary_container > div > div.summary_info > div:nth-child(3)')
    this.PriceTotalText = page.locator('#checkout_summary_container > div > div.summary_info > div:nth-child(5)')

    this.SauceCardText = page.locator('#checkout_summary_container > div > div.summary_info > div:nth-child(2)')
    this.FreePonyExpressText = page.locator('#checkout_summary_container > div > div.summary_info > div:nth-child(4)')

    this.FinishButton = page.getByRole('button', {name: 'Finish'})


  }

  async checkoutOverviewInfo(){
    await expect(this.PaymentInformationText).toBeVisible()
    await expect(this.SauceCardText).toHaveText('SauceCard #31337')
    await expect(this.ShippingInformationText).toBeVisible()
    await expect(this.FreePonyExpressText).toHaveText('Free Pony Express Delivery!')
    await expect(this.PriceTotalText).toBeVisible()
  }

  async checkfinishButton(){
    await expect(this.FinishButton).toBeVisible()
    await this.FinishButton.click()
  }

}