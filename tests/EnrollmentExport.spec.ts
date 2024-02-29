import { test, expect } from '@playwright/test';

test('Enrollmnent export', async ({ page }) => {
  await page.goto('https://mus.ph00a1.cz.infra/ui');
  await page.locator('#IDToken1').fill('much_tester');
  await page.locator('#IDToken2').fill('much_tester');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByLabel('Menu').click();
  await expect(page.locator('#VISIT_IMPORT_EXPORT')).toContainText('Visit import / export');
  await page.getByRole('menuitem', { name: 'Visit import / export' }).click();
  await page.locator('header').filter({ hasText: 'Export unassignedExport' }).locator('svg').nth(1).click();
  await expect(page.locator('[id="tab\\.enrollmentExport"]')).toContainText('Enrollment export');
  await page.getByRole('tab', { name: 'Enrollment export' }).click();
  await expect(page.getByRole('button', { name: 'Generate' })).toBeVisible();
  await page.getByRole('button', { name: 'Generate' }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('alert')).toContainText('Export has been executed');


  const downloadButton = page?.getByRole('cell', { name: 'Generate Download' }).getByRole('button').nth(1);
  const refreshButton = page?.locator('#enrollmentExportPanel').getByRole('button', { name: 'Refresh' });

  while(true) {
    const isDownloadButtonAvailable = await downloadButton.isVisible();
    if (isDownloadButtonAvailable) {
      await downloadButton?.click();
      break;
    } else { (await refreshButton.isVisible)
        await refreshButton.click();
      }
  } 
     
});

test('Download enrollment', async ({page}) => {

  const downloadButton = await page?.getByRole('cell', { name: 'Generate Download' }).getByRole('button').nth(1);
  const refreshButton = await page?.locator('#enrollmentExportPanel').getByRole('button', { name: 'Refresh' });

  while(true) {
    const isDownloadButtonAvailable = await downloadButton.isVisible();
    if (isDownloadButtonAvailable) {
      await downloadButton?.click();
      break;
    } else if (await refreshButton.isVisible()){
      await refreshButton?.click();
    }
  }


});