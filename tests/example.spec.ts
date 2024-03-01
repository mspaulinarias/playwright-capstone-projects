import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('open browser and find element', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co')

  await page.locator("input[id='cb1-edit']").fill('xiaomi')
  await page.keyboard.press('Enter')
  await expect(page.locator("//ol[contains(@class, 'ui-search-layout')]")).toBeVisible()
  //await page.pause()

  const titles = await page.locator("//ol[contains(@class, 'ui-search-layout')]//li//h2").allInnerTexts()

  console.log('The totsl of number of results is: ', titles.length)// Imprime cuantos resultados en total tengo, es decir accediendo a la propiedad del elemento
  for(let title of titles){ // title va a tomar un valor determinado cada que haga el recorrido
    console.log('The title is: ', title) //Aqui a a pasar uno por uno y lo va a imprimir */
  }
});

