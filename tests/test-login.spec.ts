import { test, base, expect } from './fixtures/fixtures';
import dotenv from 'dotenv';

dotenv.config()
const mail = process.env.USER_EMAIL
const password = process.env.USER_PASSWORD

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

    // not login, click the account can view login modal
    // not login, can close the login modal (with close button or overlay)
})

test.describe('Login modal', () => {
    // not login, click the account can view login modal
    // not login, can close the login modal (with close button or overlay), modal not visible
    // close modal reset the input and error message
    // login, no modal with click 

    test('should show login modal before for non-login user', async ({homepage_account}) => {
        await homepage_account.accountBtn.click()
        homepage_account.isLoginModalShown()
    }) 

    test('should close login modal with overlay and close button', async ({homepage_account}) => {
        await homepage_account.accountBtn.click()
        await homepage_account.loginModalCloseBtn.click()
        homepage_account.noLoginModal()

        await homepage_account.accountBtn.click()
        await homepage_account.accountBtn.click({force: true})
        homepage_account.noLoginModal()
    })

    test('login user should not see login modal', async ({homepage_account}) => {
        await homepage_account.login(mail, password)
        await homepage_account.isLogin()

        await homepage_account.accountBtn.click()
        homepage_account.noLoginModal()
        await expect(homepage_account.page).toHaveURL('https://www.castlery.com/sg/account/profile')
    }
})

test.describe('account page', () => {
    // login, click account direct to acc page
    // access acc page (url) without login direct to login page (not modal)  
})

test.describe('Login fields', () => {
    const errorEmail: string[] = ['Email must be at most 256 characters', 'This field is mandatory', 'Password must be at least 6 characters', 'Password must be at most 256 characters']
    const errorLogin: string = 'Your email and password do not match.'
    // suggestion
    // add the input field text box (email and password) to character limit attribute

    // test respective login field error msg
    // field 'aria-invalid' attribute true|false depends on the validity of field
    // login button is not responsive? before each field is formattedly correct fille
    // click login button with error, focus shift to nth(0)???
})

//make a string that is 30000 characters long with real inputs without using methods
// webpage freezes, char at the end shows opaque