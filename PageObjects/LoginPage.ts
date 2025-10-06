import { Locator, Page, expect } from "@playwright/test";

export class LoginPage{
    readonly page: Page
    readonly AcceptedUsernames: Locator
    readonly PasswordForAllUsers: Locator
    readonly FormUsername: Locator
    readonly FormPassword: Locator
    readonly FormLoginButton: Locator
    readonly LockedOutErrorMessage: Locator

    constructor(page: Page){
        this.page = page
        this.AcceptedUsernames = page.locator('.login_credentials')
        this.PasswordForAllUsers = page.locator('.login_password')
        this.FormUsername = page.locator('form input[name="user-name"]')
        this.FormPassword = page.locator('form input[name="password"]')
        this.FormLoginButton = page.locator('form input[name="login-button"]')
        this.LockedOutErrorMessage = page.locator('form .error-message-container h3')

    }

    async standardUserLogin(){
        const users = await this.getUsernames()
        const password = await this.getPassword()

        await this.FormUsername.fill(users[0])
        await this.FormPassword.fill(password[0])
        await this.FormLoginButton.click()
    }

    async lockedOutUserLogin(){
        const users = await this.getUsernames()
        const password = await this.getPassword()

        await this.FormUsername.fill(users[1])
        await this.FormPassword.fill(password[0])
        await this.FormLoginButton.click()
    }
    async problemUserUserLogin(){
        const users = await this.getUsernames()
        const password = await this.getPassword()

        await this.FormUsername.fill(users[2])
        await this.FormPassword.fill(password[0])
        await this.FormLoginButton.click()
    }
    async performanceGlitchUserLogin(){
        const users = await this.getUsernames()
        const password = await this.getPassword()

        await this.FormUsername.fill(users[3])
        await this.FormPassword.fill(password[0])
        await this.FormLoginButton.click()
    }
    async errorUserLogin(){
        const users = await this.getUsernames()
        const password = await this.getPassword()

        await this.FormUsername.fill(users[4])
        await this.FormPassword.fill(password[0])
        await this.FormLoginButton.click()
    }
    async visualUserLogin(){
        const users = await this.getUsernames()
        const password = await this.getPassword()

        await this.FormUsername.fill(users[5])
        await this.FormPassword.fill(password[0])
        await this.FormLoginButton.click()
    }




    private async getUsernames(){
        await this.page.waitForSelector('.login_logo')
        const loginDetails = await this.AcceptedUsernames.innerText()
        return loginDetails.split('\n').map(line => line.trim()).filter(line => line && !line.includes('Accepted'))
         
    }

    private async getPassword(){
        const loginPassword = await this.PasswordForAllUsers.innerText()
        return loginPassword.split('\n').map(line => line.trim()).filter(line => line && !line.includes('Password'))
        
    }

}