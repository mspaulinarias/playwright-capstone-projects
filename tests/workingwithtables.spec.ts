import { test, expect } from '@playwright/test';

test('test web table', async ({ page }) => {
  
    await page.goto('https://cosmocode.io/automation-practice-webtable/');
    

    //capturar el contenedor de la tabla por el id:
    const tableContainer = await page.locator("xpath=//table[@id='countries']")

    //Dentro de ese contenedor, busqueme otro elemento por xpath
    //en el xpath despues del punto, él me va a traer todas las filas y los alamcena en rows y esto se convertie
    //en un arreglo
    const rows = await tableContainer.locator("xpath=.//tr").all() //me trae todas las filas

    //esta variable, me va a almacenar la lista [] de todos los paises:
    const countries: Country[] = []

    //mirar cuantas filas tiene el arreglo:
    console.log("Total rows are: " + rows.length)

    //Dentro de las filas que usted trae, imprimame el texto
    for(let row of rows){
        let country: Country = { //se cre un objeto country
            name: await row.locator('xpath=.//td[2]').innerText(), //name, capital etc son sus propiedades
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            primaryLanguage: await row.locator('xpath=.//td[5]').innerText(),
            
        }
        countries.push(country)
    }

    //El For, me trae todo el array completo de todos los paises
    /*for(let allcountries of countries){
        console.log(allcountries)
    }*/

    //Aqui puedo ir haciendo mis propios test, filtrando por lenguajes, currency etc. Para hacer eso, debo comentar el for anterior.
    const countryWherePeopleSpeakPortuguese = countries.filter(country => country.primaryLanguage === 'Portuguese')
    console.log('Countries where people speak portuguese: ', countryWherePeopleSpeakPortuguese)
})

//voy a poner las propiedades que me representan a los paises
interface Country{
    name: string
    capital: string
    currency: string
    primaryLanguage: string
}


/*
element container: //table[@id='countries']
.//tr -> filas
Sacando las pripiedades de esa tabla:
//table[@id='countries']//tr[2]//td[1] -> check
//table[@id='countries']//tr[2]//td[2] -> Country
//table[@id='countries']//tr[2]//td[3] -> Capital
//table[@id='countries']//tr[2]//td[4] -> Currency
//table[@id='countries']//tr[2]//td[5] -> Primary Language

*/