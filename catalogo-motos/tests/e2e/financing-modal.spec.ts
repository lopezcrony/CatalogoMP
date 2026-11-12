import { expect, test } from '@playwright/test';

test('muestra la información de financiamiento y ofrece control de cierre', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Información de crédito' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cerrar información de crédito' })).toBeEnabled();
});
