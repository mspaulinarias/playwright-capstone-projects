import { expect, type Locator, type Page } from '@playwright/test';

export class checkoutComplete{
    readonly IconGreentick: Locator;
    readonly OrderMessageText: Locator;
    readonly DescriptionMessageText: Locator;
    readonly BackHomeButton: Locator;
    
    

  constructor(page: Page) {
    this.IconGreentick = page.getByAltText('Pony Express')
    this.OrderMessageText = page.getByRole('heading', {name: 'Thank you for your order!', exact: true})
    this.DescriptionMessageText = page.locator("div[class='complete-text']")
    this.BackHomeButton = page.locator("button[id='back-to-products']")

  }

  async OrderSuccessfullyDispatched(){
    await expect(this.IconGreentick).toBeVisible()
    await expect(this.OrderMessageText).toHaveText('Thank you for your order!')
    await expect(this.DescriptionMessageText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    await expect(this.BackHomeButton).toBeVisible()
  }
}