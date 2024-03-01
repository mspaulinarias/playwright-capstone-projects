import { test, expect } from '@playwright/test';

test('test create an account option', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByRole('link', {name: 'Crea tu cuenta'}).click()

});

test('test log in option', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByRole('link', {name: 'Ingresa',  exact: true }).click()
  await page.getByRole('textbox', {name: 'E‑mail, teléfono o usuario'}).fill('yuliethpaulin@gmail.com')
  await page.getByRole('button', {name: 'Continuar'}).click()
  
});