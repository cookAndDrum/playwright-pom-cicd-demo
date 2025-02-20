import {expect, type Locator, type Page} from '@playwright/test'


export class CastleryHomePage_AccountSection {
    readonly page: Page
    readonly accountBtn: Locator
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly loginBtn: Locator
    readonly logoutBtn: Locator
    readonly accountMenuList: Locator
    readonly accountMenuListItem: string[]

    constructor(page : Page){
        this.page = page
        this.accountBtn = page.getByLabel('account')
        this.emailField = page.getByRole('textbox', { name: 'Email', exact: true })
        this.passwordField = page.getByRole('textbox', { name: 'Password' })
        this.loginBtn = page.getByRole('button', { name: 'Log in line-right-arrow' })
        this.logoutBtn = page.getByRole('menuitem', { name: 'Log Out' })
        this.accountMenuList = page.getByRole('menu').getByRole('menuitem')
        this.accountMenuListItem = ['Account', 'Orders', 'Vouchers', 'Rewards', 'Address Book', 'Reviews', 'Log Out']
    }

    async goto() {
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

    async exitUSModal() {
        this.page.locator('div.gFsXPt__container').getByText('Stay on the Singapore site').click()
    }

    // assertion
    async hasValidAccountMenuList () {
        await this.accountBtn.hover()
        const menuitems = await this.accountMenuList.all()
        for (const item of menuitems)
            await item.isVisible()

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