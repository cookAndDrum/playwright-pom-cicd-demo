import { test as base } from '@playwright/test';
import { CastleryHomePage_AccountSection } from '../../pages/castlery-homepage_account-section';

export const test = base.extend<{ homepage_account : CastleryHomePage_AccountSection }>({
    homepage_account: async ({page} , use) => {
        const homepage_account = new CastleryHomePage_AccountSection(page)
        await homepage_account.visit()
        // locator handlers to close the modal
        homepage_account.closeIrrelevantModal()
        await use(homepage_account)
    },
})

export { test as base, expect } from '@playwright/test'