import { expect, type Locator, type Page } from '@playwright/test';
import { deepEqual } from 'assert';
import { assert } from 'console';
import exp from 'constants';
import { toNamespacedPath } from 'path';
import { execPath } from 'process';

export class checkoutOverview{
    readonly paymentInformationText: Locator;
    readonly shippingInformationText: Locator;
    readonly priceTotalText: Locator;
    readonly sauceCardText: Locator;
    readonly freePonyExpressText: Locator;
    readonly finishButton: Locator;
    readonly subtotalPrice: Locator;
    readonly totalPrice: Locator;

  constructor(page: Page) {
    this.paymentInformationText = page.locator('//div[@class="summary_info_label"][1]')
    this.shippingInformationText = page.locator('//div[@class="summary_info_label"][2]')
    this.priceTotalText = page.locator('//div[@class="summary_info_label"][3]')
    
    this.totalPrice = page.locator('//div[@class="inventory_item_price"]')
    this.subtotalPrice = page.locator('//div[@class="summary_subtotal_label"][1]')
    
    this.sauceCardText = page.locator('//div[@class="summary_value_label"][1]')
    this.freePonyExpressText = page.locator('//div[@class="summary_value_label"][2]')
    this.finishButton = page.getByRole('button', {name: 'Finish'})

  }

  async   verifyOverviewInfo(expectedCredicard: string, expectedShippingInformation: string, expectedtotalPrice: string, expectedsubtotalPrice: string ){ //ex: verifyOverviewInfo() otra cosa, ajustar todos los POMs
    // y ver cuales de ellos adentro se conservaria el expect y cuales deberían de pasar directamente a los test cases. 
    
    await expect(this.paymentInformationText).toBeVisible() //no agregan valor este método
    await expect(this.sauceCardText).toHaveText(expectedCredicard) //updated

    await expect(this.shippingInformationText).toBeVisible()
    await expect(this.freePonyExpressText).toHaveText(expectedShippingInformation)
    await expect(this.priceTotalText).toBeVisible()

    // COMMENT: Comparando dos valores, que sean iguales
    const total = expect(this.totalPrice).toHaveText(expectedtotalPrice)
    const subtotal = expect(this.subtotalPrice).toContainText(expectedsubtotalPrice)
    //const subtoalPriceContent = await this.subtotalPrice.allInnerTexts()
    //console.log('Total Price Content = ', subtoalPriceContent)
    await expect(total).toEqual(subtotal)
    
  }

  async checkFinishButton(){
    await expect(this.finishButton).toBeVisible()
    await this.finishButton.click()
  }

}