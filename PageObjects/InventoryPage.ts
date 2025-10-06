import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class InventoryPage extends HelperBase{
    readonly InventoryItemName: Locator
    readonly AddInventoryItemButton: Locator
    readonly ProductItemDescription: Locator
    readonly AddProductToCartButton: Locator
    readonly BackToProductsButton: Locator
    readonly ShoppingCartButton: Locator

    


    
    constructor(page: Page){
        super(page)
        this.InventoryItemName = page.locator('.inventory_item .inventory_item_description .inventory_item_name')
        this.AddInventoryItemButton = page.locator('.inventory_item .inventory_item_description')
        this.ProductItemDescription = page.locator('.inventory_details_desc_container .inventory_details_name')
        this.AddProductToCartButton = page.locator('.inventory_details_desc_container').getByRole('button')
        this.BackToProductsButton = page.locator('.left_component').getByRole('button')
        this.ShoppingCartButton = page.locator('.shopping_cart_container .shopping_cart_link .shopping_cart_badge')


    }


    async addAllProductsToCartFromIndividualProductPages(){
        await this.waitForInventoryPagetoLoad()

        const products = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']

        for(const product of products){
            await this.InventoryItemName.getByText(product).click()
            expect(await this.ProductItemDescription.textContent()).toEqual(product)
            await this.AddProductToCartButton.click()
            const buttonStatus = await this.AddProductToCartButton.getAttribute('name')
            expect(buttonStatus).toEqual('remove')
            await this.BackToProductsButton.click()
        }

        expect(await this.ShoppingCartButton.textContent()).toEqual(String(products.length))

    }


    async removeAllProductsFromCartFromIndvidualProductCards(){
        await this.waitForInventoryPagetoLoad()

        const products = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']

        for(const product of products){
            const productCard = this.AddInventoryItemButton.filter({hasText: product})
            await productCard.getByRole('button').click()
            const buttonStatus = await productCard.getByRole('button').textContent()
            expect(buttonStatus).toEqual('Add to cart')
        }
        expect(this.ShoppingCartButton).not.toBeVisible()

    }


    async addAllProductsFromCartFromIndvidualProductCards(){
        await this.waitForInventoryPagetoLoad()

        const products = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']

        for(const product of products){
            const productCard = this.AddInventoryItemButton.filter({hasText: product})
            await productCard.getByRole('button').click()
            const buttonStatus = await productCard.getByRole('button').textContent()
            expect(buttonStatus).toEqual('Remove')
        }

        expect(await this.ShoppingCartButton.textContent()).toEqual(String(products.length))
        await this.ShoppingCartButton.click()

    }


}

