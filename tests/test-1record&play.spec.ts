import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByLabel('Buscar', { exact: true }).fill('curso gratis');
  await page.keyboard.press('Enter')
  await page.getByRole('link', { name: 'Cursos Gratis con Certificado' }).click();
  await page.getByRole('link', { name: 'Explorar cursos gratis' }).first().click();
});