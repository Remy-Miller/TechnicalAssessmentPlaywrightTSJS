import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { HelperBase } from "./HelperBase";

export class CheckoutOverviewPage extends HelperBase{
    readonly CartItemName: Locator
    readonly CartItemCard: Locator
    readonly PriceTotal: Locator
    readonly FinishButton: Locator
    
    constructor(page: Page){
        super(page)
        this.CartItemName = page.locator('.cart_item .cart_item_label .inventory_item_name')
        this.CartItemCard = page.locator('.cart_item .cart_item_label')
        this.PriceTotal = page.locator('.summary_subtotal_label')
        this.FinishButton = page.locator('.cart_footer button[name = "finish"]')
    }

    async verifyCheckoutOverview(){
        await this.waitForCheckoutOverviewPagetoLoad()

        const products = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']
        var price = 0

        for(const product of products){

            expect(this.CartItemName.getByText(product)).toContainText(product)
            const productCard = this.page.locator('.cart_item', { hasText: product })
            const productPriceText = (await productCard.locator('.inventory_item_price').textContent()) ?? ''
            const productPrice = parseFloat(productPriceText.replace('$', '').trim())
            price += productPrice
            
        }

        expect(await this.PriceTotal.textContent()).toContain(price.toString())
        await this.FinishButton.click()
    
    }
}