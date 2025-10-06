import { test, expect } from '@playwright/test';
import {PageManager} from '../PageObjects/PageManager'


test.beforeEach(async({page}) => {
    await page.goto('/')
    await page.waitForSelector('.login_logo')
  })

test.describe('Regression Pack Release X', () =>{
  test('Standard User Checkout Experience', async ({page}) => {
    const pm = new PageManager(page)
    
    await pm.loginAs().standardUserLogin()
    await pm.inventoryManagement().addAllProductsToCartFromIndividualProductPages()
    await pm.inventoryManagement().removeAllProductsFromCartFromIndvidualProductCards()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().removeAllProductsFromCart()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().proceedToCheckout()
    await pm.checkoutInformationDetails().populateCheckoutInformation()
    await pm.checkoutOverviewDetails().verifyCheckoutOverview()
    await pm.checkoutCompletionDetails().verifyCheckoutOverview()

})  

test('Locked Out User Checkout Experience', async ({page}) => {
    test.fail(true, "A Locked Out User is attempting to login - functionality to block the user from logging in is operation as expected")
    const pm = new PageManager(page)

    await pm.loginAs().lockedOutUserLogin()
    await pm.inventoryManagement().addAllProductsToCartFromIndividualProductPages()
    await pm.inventoryManagement().removeAllProductsFromCartFromIndvidualProductCards()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().removeAllProductsFromCart()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().proceedToCheckout()
    await pm.checkoutInformationDetails().populateCheckoutInformation()
    await pm.checkoutOverviewDetails().verifyCheckoutOverview()
    await pm.checkoutCompletionDetails().verifyCheckoutOverview()
})

test('Problem User Checkout Experience', async ({page}) => {
    test.fail(true, "Inventory Pages are misaligned to Product pages names/descriptions")
    const pm = new PageManager(page)

    await pm.loginAs().problemUserUserLogin()
    await pm.inventoryManagement().addAllProductsToCartFromIndividualProductPages()
    await pm.inventoryManagement().removeAllProductsFromCartFromIndvidualProductCards()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().removeAllProductsFromCart()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().proceedToCheckout()
    await pm.checkoutInformationDetails().populateCheckoutInformation()
    await pm.checkoutOverviewDetails().verifyCheckoutOverview()
    await pm.checkoutCompletionDetails().verifyCheckoutOverview()
})

test('Performance Glitch User Checkout Experience', async ({page}) => {
    const pm = new PageManager(page)

    await pm.loginAs().performanceGlitchUserLogin()
    await pm.inventoryManagement().addAllProductsToCartFromIndividualProductPages()
    await pm.inventoryManagement().removeAllProductsFromCartFromIndvidualProductCards()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().removeAllProductsFromCart()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().proceedToCheckout()
    await pm.checkoutInformationDetails().populateCheckoutInformation()
    await pm.checkoutOverviewDetails().verifyCheckoutOverview()
    await pm.checkoutCompletionDetails().verifyCheckoutOverview()
})

test('Error User Checkout Experience', async ({page}) => {
    test.fail(true, "Remove Cart buttons for 3/6 products are not functioning as expected")
    const pm = new PageManager(page)

    await pm.loginAs().errorUserLogin()
    await pm.inventoryManagement().addAllProductsToCartFromIndividualProductPages()
    await pm.inventoryManagement().removeAllProductsFromCartFromIndvidualProductCards()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().removeAllProductsFromCart()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().proceedToCheckout()
    await pm.checkoutInformationDetails().populateCheckoutInformation()
    await pm.checkoutOverviewDetails().verifyCheckoutOverview()
    await pm.checkoutCompletionDetails().verifyCheckoutOverview()
})

test('Visual User Checkout Experience', async ({page}) => {
    const pm = new PageManager(page)
    
    await pm.loginAs().visualUserLogin()
    await pm.inventoryManagement().addAllProductsToCartFromIndividualProductPages()
    await pm.inventoryManagement().removeAllProductsFromCartFromIndvidualProductCards()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().removeAllProductsFromCart()
    await pm.inventoryManagement().addAllProductsFromCartFromIndvidualProductCards()
    await pm.yourCartManagement().proceedToCheckout()
    await pm.checkoutInformationDetails().populateCheckoutInformation()
    await pm.checkoutOverviewDetails().verifyCheckoutOverview()
    await pm.checkoutCompletionDetails().verifyCheckoutOverview()
})
})
