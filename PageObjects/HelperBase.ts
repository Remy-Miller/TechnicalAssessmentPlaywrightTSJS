import { Locator, Page, expect } from "@playwright/test";

export class HelperBase{
    readonly page: Page

    constructor(page: Page){
        this.page = page

    }

    async waitForInventoryPagetoLoad(){
        await expect(this.page).toHaveURL(/inventory\.html/)
        await this.page.waitForSelector('.header_secondary_container .title')
        const pageName = await this.page.locator('.header_secondary_container .title').textContent()
        expect(pageName).toEqual('Products')
    }

    async waitForYourCartPagetoLoad(){
        await expect(this.page).toHaveURL(/cart\.html/)
        await this.page.waitForSelector('.header_secondary_container .title')
        const pageName = await this.page.locator('.header_secondary_container .title').textContent()
        expect(pageName).toEqual('Your Cart')
    }

    async waitForCheckoutInformationPagetoLoad(){
        await expect(this.page).toHaveURL(/checkout-step-one\.html/)
        await this.page.waitForSelector('.header_secondary_container .title')
        const pageName = await this.page.locator('.header_secondary_container .title').textContent()
        expect(pageName).toEqual('Checkout: Your Information')
    }

    async waitForCheckoutOverviewPagetoLoad(){
        await expect(this.page).toHaveURL(/checkout-step-two\.html/)
        await this.page.waitForSelector('.header_secondary_container .title')
        const pageName = await this.page.locator('.header_secondary_container .title').textContent()
        expect(pageName).toEqual('Checkout: Overview')
    }
    async waitForCheckoutCompletionPagetoLoad(){
        await expect(this.page).toHaveURL(/checkout-complete\.html/)
        await this.page.waitForSelector('.header_secondary_container .title')
        const pageName = await this.page.locator('.header_secondary_container .title').textContent()
        expect(pageName).toEqual('Checkout: Complete!')
    }

}