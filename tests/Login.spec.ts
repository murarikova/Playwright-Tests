import { test, expect} from '@playwright/test';

async function  Login(page) {
    await page.goto('https://mus.ph00a1.cz.infra/ui');
    await page.goto('https://sso.ph00a1.cz.infra/opensso/UI/Login?goto=https://mus.ph00a1.cz.infra/ui');
    await page.locator('#IDToken1').fill('much_tester');
    await page.locator('#IDToken1').press('Tab');
    await page.locator('#IDToken2').fill('much_tester');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByLabel('Menu').click();
    
}

test('Prihlasenie', async ({page}) => {
    await Login(page);

});

    module.exports = Login;