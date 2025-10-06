import { Locator, Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { InventoryPage } from "./InventoryPage";
import { YourCartPage } from "./YourCartPage";
import { CheckoutInformationPage } from "./CheckoutInformationPage";
import { CheckoutOverviewPage } from "./CheckoutOverviewPage";
import { CheckoutCompletionPage } from "./CheckoutCompletionPage";


export class PageManager{
    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly inventoryPage: InventoryPage
    private readonly yourCartPage: YourCartPage
    private readonly checkoutInformationPage: CheckoutInformationPage
    private readonly checkoutOverviewPage: CheckoutOverviewPage
    private readonly checkoutCompletionPage: CheckoutCompletionPage



  

    constructor(page: Page){
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.inventoryPage = new InventoryPage(this.page)
        this.yourCartPage = new YourCartPage(this.page)
        this.checkoutInformationPage = new CheckoutInformationPage(this.page)
        this.checkoutOverviewPage = new CheckoutOverviewPage(this.page)
        this.checkoutCompletionPage = new CheckoutCompletionPage(this.page)
    }    

    loginAs(){
        return this.loginPage
    }
    inventoryManagement(){
        return this.inventoryPage
    }

    yourCartManagement(){
        return this.yourCartPage
    }

    checkoutInformationDetails(){
        return this.checkoutInformationPage
    }

    checkoutOverviewDetails(){
        return this.checkoutOverviewPage
    }

    checkoutCompletionDetails(){
        return this.checkoutCompletionPage
    }
}