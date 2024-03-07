import { expect, type Locator, type Page } from '@playwright/test';
import exp from 'constants';
import { login } from './login';

export class inventoryShoppingcard {
    readonly itemnameInShoppoingCard: Locator;
    readonly addToCardButton: Locator;
    readonly shoppingCardbutton: Locator;
    readonly removebutton: Locator;


    constructor (page: Page){
       this.itemnameInShoppoingCard = page.locator('a[id="item_4_title_link"]')
       this.addToCardButton = page.locator('button[id="add-to-cart-sauce-labs-backpack"]')
       this.shoppingCardbutton = page.locator('div[id="shopping_cart_container"]')
       this.removebutton = page.getByRole('button', {name: 'Remove'})

    }

    async selectItemShoppingCard(){
        //Pregunta: Para ejecutar el método, debe diseñarse en el orden en que se debe de ejecutar el flow?
        await expect(this.itemnameInShoppoingCard).toBeVisible()
        await this.addToCardButton.click()
        
        await this.shoppingCardbutton.click()
        const textItem = 'Sauce Labs Backpack'
        await expect(this.itemnameInShoppoingCard).toHaveText(textItem)
        
    }

    async removeItemShoppingcard(){
        await expect(this.removebutton).toBeVisible()
        await this.removebutton.click()

        await expect(this.itemnameInShoppoingCard).not.toBeVisible()


    }

}