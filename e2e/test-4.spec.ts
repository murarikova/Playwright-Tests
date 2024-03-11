import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mus.ph00a1.cz.infra/ui');
  await page.goto('https://sso.ph00a1.cz.infra/opensso/UI/Login?goto=https://mus.ph00a1.cz.infra/ui');
  await page.locator('#IDToken1').click();
  await page.locator('#IDToken1').fill('much_tester');
  await page.locator('#IDToken2').click();
  await page.locator('#IDToken2').fill('much_tester');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByLabel('Menu').click();
  await page.getByRole('menuitem', { name: 'System administration' }).click();
  await expect(page.locator('#systemAdministrationDashboard')).toContainText('Serviceable areas');
  await page.getByRole('button', { name: 'Serviceable areas Reload' }).click();
});