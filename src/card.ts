import { expect, type Locator, type Page } from '@playwright/test';
import exp from 'constants';
import { login } from './login';

export class card {
  readonly quantityInt: Locator;
  readonly descriptionString: Locator;
  readonly priceInt: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page, test = 'hola test') {
    this.quantityInt = page.locator('div[class="cart_quantity"]')
    this.descriptionString = page.locator('a[id="item_4_title_link"]')
    this.priceInt = page.locator('div[class="inventory_item_price"]')
    this.checkoutButton = page.getByRole('button', {name: 'Checkout'})
  }

  async checkItemCard(){ 
    await expect(this.quantityInt).toHaveCount(1)
    await expect(this.descriptionString).toHaveText('Sauce Labs Backpack')
    //FIXME: Como puedo mejorar este expected relacionado al precio, ya que no tiene un id o un localizador que lo haga único,
    // Por ende, la opción más viable que ví fué hacer un assertion por toHaveText. Pero que pasa si otro producto tiene el mismo precio?
    await expect(this.priceInt).toHaveText('$29.99')
    
  } 

  async openCheckoutInfoPage(){
    await this.checkoutButton.click()
  }

}
