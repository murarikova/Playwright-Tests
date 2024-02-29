import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('https://mus.ph00a1.cz.infra/ui');    
  });

  test('main navigation', async ({ page }) => {
    // Assertions use the expect API.
    await expect(page).toHaveURL('https://sso.ph00a1.cz.infra/opensso/UI/Login?goto=https://mus.ph00a1.cz.infra/ui');
  });
});