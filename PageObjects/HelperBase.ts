import { Locator, Page, expect } from "@playwright/test"
import { promises as fs } from 'fs'
import * as path from 'path'

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

    
    async timestampGenerator(): Promise<string> {
    const now = new Date()

    const year = String(now.getFullYear())
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    const dir = path.join('Evidence', year, month, day)
    await fs.mkdir(dir, { recursive: true })

    const filePath = path.join(dir, `${hours}${minutes}${seconds}.png`)
    return filePath

    }



}