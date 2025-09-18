import { test, expect } from '@playwright/test';

test('Documents: filter and open preview', async ({ page }) => {
  await page.goto('/documents');

  // Filter PDFs
  await page.getByRole('combobox').first().selectOption('pdf');

  // Open first card
  const firstCard = page.locator('.card').nth(1); // skip filter card
  await firstCard.click();

  // Drawer should open
  await expect(page.locator('text=Preview:')).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
});

