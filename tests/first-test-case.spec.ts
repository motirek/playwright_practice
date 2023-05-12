import { test, expect } from "@playwright/test";

test ("Register User", async ({page}) => {
    await page.goto("https://automationexercise.com/", {waitUntil : "domcontentloaded"})

    await page.getByText('Signup / Login').click()

    let visible = await page.isVisible('text="New User Signup!"')
    expect(visible).toBeTruthy()

    await page.getByPlaceholder('Name').fill('test')
    await page.locator('//*[@data-qa="signup-email"]').fill("jedna@test.test")
    await page.getByText("Signup", {exact : true}).click()

    visible = await page.isVisible('text="Enter Account Information"')
    expect(visible).toBeTruthy()

    await page.getByRole('radio').last().check()
    await page.getByLabel('Password').fill("test")
    
    await page.locator('#days').selectOption('6')
    await page.locator('#months').selectOption('5')
    await page.locator('#years').selectOption('1999')
    
    await page.getByLabel('Sign up for our newsletter!').check()
    await page.getByLabel('Receive special offers from our partners!').check()
    //TODO: Dodělat Test Case 1 od bodu 12
     
})