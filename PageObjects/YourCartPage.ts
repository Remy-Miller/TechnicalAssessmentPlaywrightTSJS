import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class YourCartPage extends HelperBase{
    readonly CartItemName: Locator
    readonly RemoveCartItemButton: Locator
    readonly ContinueShoppingButton: Locator
    readonly CheckoutButton: Locator
    
    constructor(page: Page){
        super(page)
        this.CartItemName = page.locator('.cart_item .cart_item_label .inventory_item_name')
        this.RemoveCartItemButton = page.locator('.cart_item .cart_item_label')
        this.ContinueShoppingButton = page.locator('.cart_footer button[name = "continue-shopping"]')
        this.CheckoutButton = page.locator('.cart_footer button[name = "checkout"]')
    }

    async removeAllProductsFromCart(){
        await this.waitForYourCartPagetoLoad()

        const products = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']

        for(const product of products){

            expect(this.CartItemName.getByText(product)).toContainText(product)
            const productCard = this.RemoveCartItemButton.filter({hasText: product})
            await productCard.getByRole('button').click()
        }

        await this.ContinueShoppingButton.click()
    }

    async proceedToCheckout(){
        await this.waitForYourCartPagetoLoad()

        const products = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']

        for(const product of products){

            expect(this.CartItemName.getByText(product)).toContainText(product)
        }

        await this.CheckoutButton.click()
    }
}