import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { HelperBase } from "./HelperBase";

export class CheckoutCompletionPage extends HelperBase{
    readonly CompletionHeader: Locator
    readonly CompletionMessage: Locator
    readonly BackHomeButton: Locator
    
    constructor(page: Page){
        super(page)
        this.CompletionHeader = page.locator('.complete-header')
        this.CompletionMessage = page.locator('.complete-text')
        this.BackHomeButton = page.locator('button[name = "back-to-products"]')
    }

    async verifyCheckoutOverview(){
        await this.waitForCheckoutCompletionPagetoLoad()

        const Header = await this.CompletionHeader.textContent()
        const Message = await this.CompletionMessage.textContent()
        expect(Header).toEqual('Thank you for your order!')
        expect(Message).toEqual('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
        await this.BackHomeButton.click()
    
    }
}