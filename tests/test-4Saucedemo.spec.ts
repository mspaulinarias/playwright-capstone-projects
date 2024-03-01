import { test, expect } from '@playwright/test';

test('purchase an item', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user')
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce')
    await page.getByRole('button', {name: 'Login'}).click()

    //await page.pause()

    //De forma aleatoria, vamos a seleccionar un item cualquiera, le damos click y comparamos en detalle
    //esos valores Vs los valores que estan dentro de la opción del carrito de compras: Nombre, descripción y precio

    const itemsContainer =  await page.locator('#inventory_container .inventory_item').all() //Me va a traer una lista de elementos

    //Encontrar un elemento random dentro de esa lista, se va a crear un randomindex.
    const randomIndex = Math.floor(Math.random() * itemsContainer.length)

    //Luego le voy a decir que me de un item random basada en la loingitud de todos los items
    // es decir, cada vez que yo lo ejecute, él me va a seleccionar cualquier item de la lista un random:
    
    const randomItem = itemsContainer[randomIndex] //[]arreglo de elementos

    //Voy a sacar de ese elemento que capturé, todas las propiedades, aqui no uso page, sino el randomItem
    const expectedDscription = await randomItem.locator('.inventory_item_desc').innerText() //me da la descripción de los elementos
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()//me da el precio de los elementos
    const expectedName = await randomItem.locator('.inventory_item_name ').innerText() //me da el nombre de los elementos

    //imprimir todos los valores
    console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDscription}`) //para sacar estas comillas: command + boton: "]}"

    //Ahora vamos a hacer click en el botón "Add to cart"
    //Nota: Aqui yo no interactuo con el page, sino con los elementos dentro de esos items
    await randomItem.getByRole('button' , {name: 'Add to cart'}).click()

    //Luego se hace click en el botón del carrito. Aqui si uso el page, porque ese carrito, no está dentro del randomItem
    await page.locator('a.shopping_cart_link').click()

    //await page.pause()

    //Antes de hacer la comparación de la info, voy a checcar que el botón "checkout" sea visible
    expect(page.getByRole('button' , {name: 'checkout'})).toBeVisible

    //Realizamos la comparación de la info agregada al carrito
    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toEqual(expectedName)
    expect(actualDescription).toEqual(expectedDscription)
    expect(actualPrice).toEqual(expectedPrice)

    await page.getByRole('button', {name: 'Checkout'}).click()

    await page.getByRole('textbox', {name: 'First Name'}).fill('Donatela')
    await page.getByRole('textbox', {name: 'Last Name'}).fill('De la conchita')
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('5001')

    expect(page.getByRole('button', {name: 'Continue'})).toBeVisible()
    await page.getByRole('button', {name: 'Continue'}).click()
    await page.getByRole('button', {name: 'Finish'}).click()

    expect(page.locator('.pony_express')).toBeVisible
    await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible()
    expect(page.locator('.complete-text')).toBeVisible()


  });