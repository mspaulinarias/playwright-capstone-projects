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

  async checkoutOverviewInfo(){
    
    await expect(this.paymentInformationText).toBeVisible()
    await expect(this.sauceCardText).toHaveText('SauceCard #31337')
    await expect(this.shippingInformationText).toBeVisible()
    await expect(this.freePonyExpressText).toHaveText('Free Pony Express Delivery!')
    await expect(this.priceTotalText).toBeVisible()

    // COMMENT: Revisar si esta lógica estaría bien para comparar dos valores. Asi como está me funcionó. 
    const total = expect(this.totalPrice).toHaveText('$29.99')
    const subtotal = expect(this.subtotalPrice).toContainText('$29.99')
    expect(total).toEqual(subtotal)
    
  }

  async checkFinishButton(){
    await expect(this.finishButton).toBeVisible()
    await this.finishButton.click()
  }

}