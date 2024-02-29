const {test, expect} = require ('@playwright/test');
const Login = require('./Login.spec')

test ('Enrollment Management', async ({page}) => {
await Login(page);
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