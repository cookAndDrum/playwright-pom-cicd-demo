import { test, expect } from '@playwright/test';
import {CastleryHomePage_AccountSection} from '../pages/castlery-homepage_account-section';
import dotenv from 'dotenv';

dotenv.config()
const mail = process.env.USER_EMAIL
const password = process.env.USER_PASSWORD

test('login through homepage', async({page}) => {

    const homepage_account = new CastleryHomePage_AccountSection(page)
    await homepage_account.goto()

    await page.addLocatorHandler(page.locator('.dy-modal-container'), async () => {
        await page.locator('div.dy-lb-close').click()
    })

    await homepage_account.exitUSModal()
    await homepage_account.login(mail, password)
    await homepage_account.hasValidAccountMenuList()
    await homepage_account.isLogin()
})
