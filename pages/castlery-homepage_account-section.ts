import {expect, type Locator, type Page} from '@playwright/test'

interface Dictionary <T> {
    [key: string | number | symbol ] : T,
}

export class CastleryHomePage_AccountSection {
    readonly page: Page
    // menubar
    readonly accountBtn: Locator
    readonly logoutBtn: Locator
    readonly accountMenuList: Locator
    readonly accountMenuListItem: string[]

    // login modal
    readonly loginModal: Locator 
    readonly loginModalCloseBtn: Locator
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginBtn: Locator
    readonly errorMessage: Dictionary<Locator>
    

    constructor(page : Page){
        this.page = page
        this.accountBtn = page.getByLabel('account')
        this.logoutBtn = page.getByRole('menuitem', { name: 'Log Out' })
        this.accountMenuList = page.getByRole('menu').getByRole('menuitem')
        this.accountMenuListItem = ['Account', 'Orders', 'Vouchers', 'Rewards', 'Address Book', 'Reviews', 'Log Out']

        this.loginModal = page.locator('.YH3Oz4__container')
        this.loginModalCloseBtn = this.loginModal.locator('button.btn.YH3Oz4__close')
        this.emailField = page.getByRole('textbox', { name: 'Email', exact: true })
        this.passwordField = page.getByRole('textbox', { name: 'Password' })
        this.loginBtn = page.getByRole('button', { name: 'Log in line-right-arrow' })
        this.errorMessage = {
            "email": this.emailField.locator('+ label + [role="alert"]'),
            "password": this.passwordField.locator('+ label + [role="alert"]'),
            "login": this.page.getByRole('paragraph', {'name': 'Log in with Email'}).locator('+ .DY71YT'),
        }
    }

    async visit() {
        await this.page.goto('https://www.castlery.com/sg')
    }

    // action
    async login(mail: string, password:string) {
        await this.accountBtn.click()
        await this.emailField.fill(mail)
        await this.passwordField.fill(password)
        await this.loginBtn.click()
    }

    async logout() {
        await this.accountBtn.hover()
        await this.logoutBtn.click()
    }

    async closeIrrelevantModal() {
        await this.page.addLocatorHandler(this.page.locator('div.gFsXPt__container'), async () => {
            await this.page.locator('div.gFsXPt__container').getByText('Stay on the Singapore site').click()
        })
        await this.page.addLocatorHandler(this.page.locator('.dy-modal-container'), async () => {
            await this.page.locator('div.dy-lb-close').click()
        })
    }

    // assertion
    async isLoginModalShown () {
        await expect(this.loginModal).toBeAttached()
        await expect(this.loginModal).toBeVisible()
        await expect(this.loginModal).toBeInViewport()
        
        await expect(this.emailField).toBeVisible()
        await expect(this.emailField).toBeEditable()
        await expect(this.emailField).toBeEmpty()

        await expect(this.passwordField).toBeVisible()
        await expect(this.passwordField).toBeEditable()
        await expect(this.passwordField).toBeEmpty()

        await expect(this.loginBtn).toBeVisible()
    }

    async noLoginModal () {
        await expect(this.loginModal).not.toBeVisible()
        await expect(this.loginModal).not.toBeAttached()
    }

    async hasValidAccountMenuList () {
        await this.accountBtn.hover()
        const menuitems = await this.accountMenuList.all()
        for (const item of menuitems)
            await expect(item).toBeVisible()

        await expect(this.accountMenuList).toHaveCount(this.accountMenuListItem.length)
        await expect(this.accountMenuList).toContainText(this.accountMenuListItem)
    }

    async isLogin() {
        // add new span for login icon
        const iconChange = this.accountBtn.locator('> span')
        await expect(iconChange).toHaveCount(1)

        // account page available
        await this.accountBtn.click()
        await expect(this.page).toHaveURL('https://www.castlery.com/sg/account/profile')
    }
}