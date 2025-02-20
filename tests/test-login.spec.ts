import { test as base, expect } from '@playwright/test';
import {CastleryHomePage_AccountSection} from '../pages/castlery-homepage_account-section';
import dotenv from 'dotenv';

dotenv.config()
const mail = process.env.USER_EMAIL
const password = process.env.USER_PASSWORD

// fixture for following tesst
const test = base.extend<{ homepage_account }>({
    homepage_account: async ({page} , use) => {
        const homepage_account = new CastleryHomePage_AccountSection(page)
        await homepage_account.goto()
        homepage_account.closeModal()
        await use(homepage_account)
    },
})

test.describe('Login and Logout', () => {
    test('login through homepage', async({homepage_account}) => {
        await homepage_account.login(mail, password)
        await homepage_account.hasValidAccountMenuList()
        await homepage_account.isLogin()
    })

    test('logout through homepage', async({homepage_account}) => {
        await homepage_account.login(mail, password)
        await homepage_account.logout()

        // TODO assertion
    })
})