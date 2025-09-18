import { test, expect } from '@playwright/test';

test('Capture dashboard preview', async ({ page }) => {
  // Use a consistent viewport for the tile
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('/');

  // Wait for key dashboard elements to be visible
  await expect(page.locator('text=NeuroStack')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('text=Docs Ingested')).toBeVisible();

  // Small pause to let fonts settle in CI/dev
  await page.waitForTimeout(200);

  // Save into public so README can reference it
  await page.screenshot({ path: 'public/preview.png', fullPage: false });
});
