import { test, expect } from '@playwright/test';

test('Index builder and chat flow', async ({ page }) => {
  await page.goto('/index');

  // Rebuild index updates console time
  await page.getByRole('button', { name: 'Rebuild Index' }).click();
  await expect(page.getByTestId('index-console')).toContainText('Last build:');

  // Send a chat message
  const composer = page.getByPlaceholder('Ask your index…');
  await composer.fill('What is coverage limit?');
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.getByTestId('chat-card')).toContainText('Mock answer to:');
  await expect(page.getByTestId('sources-panel')).toBeVisible();
});
