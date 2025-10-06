import { Locator, Page, expect } from "@playwright/test";
import { HelperBase } from "./HelperBase";

export class InventoryPage extends HelperBase{
    readonly InventoryItem: Locator
    readonly InventoryItemName: Locator
    readonly AddInventoryItemButton: Locator
    readonly ProductItemDescription: Locator
    readonly ProductImage: Locator
    readonly AddProductToCartButton: Locator
    readonly BackToProductsButton: Locator
    readonly ShoppingCartButton: Locator
    // readonly 

    


    
    constructor(page: Page){
        super(page)
        this.InventoryItem = page.locator('.inventory_item')
        this.InventoryItemName = page.locator('.inventory_item .inventory_item_description .inventory_item_name')
        this.AddInventoryItemButton = page.locator('.inventory_item .inventory_item_description')
        this.ProductItemDescription = page.locator('.inventory_details_desc_container .inventory_details_name')
        this.ProductImage = page.locator('.inventory_details_img')
        this.AddProductToCartButton = page.locator('.inventory_details_desc_container').getByRole('button')
        this.BackToProductsButton = page.locator('.left_component').getByRole('button')
        this.ShoppingCartButton = page.locator('.shopping_cart_container .shopping_cart_link .shopping_cart_badge')


    }

    private items = [
            { product: 'Sauce Labs Backpack', image: 'sauce-backpack' },
            { product: 'Sauce Labs Bike Light', image: 'bike-light' },
            { product: 'Sauce Labs Bolt T-Shirt', image: 'bolt-shirt' },
            { product: 'Sauce Labs Fleece Jacket', image: 'sauce-pullover' },
            { product: 'Sauce Labs Onesie', image: 'onesie' },
            { product: 'Test.allTheThings() T-Shirt (Red)', image: 'red-tatt' }
        ]

    async addAllProductsToCartFromIndividualProductPages(){
        await this.waitForInventoryPagetoLoad()

        for(const {product, image} of this.items){
            const inventoryItem = this.InventoryItem.filter({has: this.page.locator('.inventory_item_name', { hasText: product })})
            const inventoryImgSrc = await inventoryItem.locator('.inventory_item_img img').getAttribute('src')
            expect(inventoryImgSrc).toContain(image)
            await this.InventoryItemName.getByText(product).click()
            const productImage = await this.ProductImage.getAttribute('src')
            expect(productImage).toContain(image)
            expect(await this.ProductItemDescription.textContent()).toEqual(product)
            await this.AddProductToCartButton.click()
            const buttonStatus = await this.AddProductToCartButton.getAttribute('name')
            expect(buttonStatus).toEqual('remove')
            await this.BackToProductsButton.click()
        }

        expect(await this.ShoppingCartButton.textContent()).toEqual(String(this.items.length))

    }


    async removeAllProductsFromCartFromIndvidualProductCards(){
        await this.waitForInventoryPagetoLoad()

        for(const {product, image} of this.items){
            const productCard = this.AddInventoryItemButton.filter({hasText: product})
            await productCard.getByRole('button').click()
            const buttonStatus = await productCard.getByRole('button').textContent()
            expect(buttonStatus).toEqual('Add to cart')
        }
        expect(this.ShoppingCartButton).not.toBeVisible()

    }


    async addAllProductsFromCartFromIndvidualProductCards(){
        await this.waitForInventoryPagetoLoad()

        for(const {product, image} of this.items){
            const productCard = this.AddInventoryItemButton.filter({hasText: product})
            await productCard.getByRole('button').click()
            const buttonStatus = await productCard.getByRole('button').textContent()
            expect(buttonStatus).toEqual('Remove')
        }

        expect(await this.ShoppingCartButton.textContent()).toEqual(String(this.items.length))
        await this.ShoppingCartButton.click()

    }


}

