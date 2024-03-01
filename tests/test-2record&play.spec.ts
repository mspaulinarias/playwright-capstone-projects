import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');

  await page.locator('//*[@id="cb1-edit"]').fill('xiaomi'); //LLena el textbox con 'iphone'
  await page.getByRole('button', { name: 'Buscar' }).click(); //hace click en la lupa
  await page.getByRole('link', { name: 'Apple iPhone 15 Pro (128 GB' }).click(); //encuentra en la lista el cellphone deseado y hace click on it
  await page.getByRole('button', { name: 'Comprar ahora' }).first().click(); //hace click en el botón comprar ahora. 
});