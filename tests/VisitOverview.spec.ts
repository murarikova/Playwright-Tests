import { test, expect } from '@playwright/test';

test('Search unassigned visits', async ({ page }) => {

  await page.locator('#IDToken1').fill('much_tester');
  await page.locator('#IDToken1').press('Tab');
  await page.locator('#IDToken2').fill('much_tester');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByLabel('Menu').click();
  await expect(page.getByRole('menuitem', { name: 'Visit overview' })).toBeVisible();
  await page.getByRole('menuitem', { name: 'Visit overview' }).click();
  await expect(page.locator('[id="expansionPanel\\.visit"]')).toContainText('Visit case');
  await expect(page.getByLabel('Visit case', { exact: true }).getByRole('list')).toContainText('Visit case type');
  await expect(page.getByLabel('Visit case', { exact: true }).getByRole('list')).toContainText('Visit case state');
  await expect(page.locator('#mui-component-select-visitCaseStates')).toBeVisible();
  await page.locator('#mui-component-select-visitCaseStates').click();
  await expect(page.getByRole('listbox')).toContainText('Unassigned');
  await page.getByRole('option', { name: 'Unassigned' }).click();
  await page.locator('#menu-visitCaseStates div').first().click();
  await expect(page.getByLabel('Search')).toBeVisible();
  await page.getByLabel('Search').click();
  await page.getByRole('row', { name: '524 10 LEC Unassigned 2021-12' }).getByRole('button').click();
  await expect(page.getByRole('dialog')).toContainText('Visit case detail');
  await expect(page.getByRole('button')).toBeVisible();
  await page.getByRole('button').click();
});


  

