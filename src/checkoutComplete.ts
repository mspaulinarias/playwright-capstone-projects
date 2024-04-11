import { expect, type Locator, type Page } from '@playwright/test';

export class checkoutComplete{
    readonly iconGreentick: Locator;
    readonly orderMessageText: Locator;
    readonly descriptionMessageText: Locator;
    readonly backHomeButton: Locator;
    
  constructor(page: Page) {
    this.iconGreentick = page.getByAltText('Pony Express')
    this.orderMessageText = page.getByRole('heading', {name: 'Thank you for your order!', exact: true})
    this.descriptionMessageText = page.locator("div[class='complete-text']")
    this.backHomeButton = page.locator("button[id='back-to-products']")

  }

  async verifyOrderSuccessfullyDispatched(expetedOrderMessage: string, expectedDescriptionMessage: string){
    await expect(this.iconGreentick).toBeVisible()
    await expect(this.orderMessageText).toHaveText(expetedOrderMessage)
    await expect(this.descriptionMessageText).toHaveText(expectedDescriptionMessage)
    await expect(this.backHomeButton).toBeVisible()
  }
}