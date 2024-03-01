import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Running ${testInfo.title}`);
    await page.goto('https://mus.ph00a1.cz.infra/ui');
    expect(page.url()).toBe('https://sso.ph00a1.cz.infra/opensso/UI/Login?goto=https://mus.ph00a1.cz.infra/ui');
    await page.locator('#IDToken1').fill('much_tester');
    await page.locator('#IDToken1').press('Tab');
    await page.locator('#IDToken2').fill('much_tester');
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByLabel('Menu').click();
  });
  

test ('Enrollment Management', async ({page}) => {
await expect(page.locator('#GLOBAL_USER_MANAGEMENT')).toContainText('User management');
await page.getByRole('menuitem', { name: 'User management' }).click();
await page.locator('input[name="form\\.username"]').click();
await page.locator('input[name="form\\.username"]').fill('muf_tester');
await page.getByLabel('Search').click();
await expect(page.getByRole('button', { name: 'enroll', exact: true })).toBeVisible();
await page.getByRole('button', { name: 'enroll', exact: true }).click();
await expect(page.getByRole('heading', { name: 'Enrollment management' }).locator('div').first()).toContainText('Enrollment management');
await expect(page.locator('#addEnrollmentButton')).toBeVisible();
await page.locator('#addEnrollmentButton').click();
await page.locator('#Region').getByRole('button', { name: '​' }).click();
await page.getByRole('option', { name: 'ZIP: 2427' }).click();
await page.locator('[id="Role\\ type"]').getByRole('button', { name: '​' }).click();
await page.getByRole('option', { name: 'Visitor' }).click();
await page.locator('[id="Visit\\ case\\ type"] > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-root').click();
await page.getByRole('option', { name: 'EFC' }).click();
await expect(page.locator('#saveEnrollmentButton')).toBeVisible();
await page.locator('#saveEnrollmentButton').click();
await expect(page.locator('div').filter({ hasText: /^Error: Request failed with status code 412: Enrollment already exists$/ }).nth(3)).toBeVisible();
await expect(page.locator('#footer-content')).toContainText('Error: Request failed with status code 412: Enrollment already exists');
await page.getByRole('button', { name: 'Close' }).click();

});