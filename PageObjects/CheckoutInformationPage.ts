import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
import { HelperBase } from "./HelperBase";

export class CheckoutInformationPage extends HelperBase{
    readonly FormFirstName: Locator
    readonly FormLastName: Locator
    readonly FormPostalCode: Locator
    readonly ContinueButton: Locator
    
    constructor(page: Page){
        super(page)
        this.FormFirstName = page.locator('.form_group input[name="firstName"]')
        this.FormLastName = page.locator('.form_group input[name="lastName"]')
        this.FormPostalCode = page.locator('.form_group input[name="postalCode"]')
        this.ContinueButton = page.locator('form .checkout_buttons input[name="continue"]')
    }

    async populateCheckoutInformation(){
        await this.waitForCheckoutInformationPagetoLoad()

        const name = faker.person.firstName()
        const surname = faker.person.lastName()
        const postalCode = faker.location.zipCode()

        await this.FormFirstName.fill(name)
        await this.FormLastName.fill(surname)
        await this.FormPostalCode.fill(postalCode)
        await this.ContinueButton.click()
    }
}