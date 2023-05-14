import { expect, Page } from "@playwright/test";

/**
 * Zrychlení psaní pro vytvoření účtu
 * @param page Karta (Tab), ve kterém se bude pracovat
 * @param logout true - Odhlásí uživatele, false - nechá uživatele přihlášeného
 */
export default async function createAccount(page: Page, logout: boolean) {
  await page.getByText("Signup / Login").click();

  let visible = await page.getByText("New User Signup!").isVisible();
  expect(visible).toBeTruthy();

  await page.getByPlaceholder("Name").fill("test");
  await page.locator('//*[@data-qa="signup-email"]').fill("test@test.test");
  await page.getByText("Signup", { exact: true }).click();

  visible = await page.getByText("Enter Account Information").isVisible();
  expect(visible).toBeTruthy();

  await page.getByRole("radio").last().check();
  await page.getByLabel("Password").fill("test");

  await page.locator("#days").selectOption("6");
  await page.locator("#months").selectOption("5");
  await page.locator("#years").selectOption("1999");

  await page.getByLabel("Sign up for our newsletter!").check();
  await page.getByLabel("Receive special offers from our partners!").check();

  await page.getByLabel("First name").fill("Jméno");
  await page.getByLabel("Last Name").fill("Příjmení");
  await page.getByLabel("Company", { exact: true }).fill("Firma");
  await page.locator("#address1").fill("adresa 1");
  await page.getByLabel("Address 2").fill("adresa 2");
  await page.locator("#country").selectOption("Israel");
  await page.getByLabel("State").fill("Kraj");
  await page.getByLabel("City").fill("Město");
  await page.locator("#zipcode").fill("46015");
  await page.getByLabel("Mobile Number").fill("+420 123 123 123");

  await page.getByText("Create Account").click();
  visible = await page.getByText("ACCOUNT CREATED!").isVisible();
  expect(visible).toBeTruthy();

  await page.getByText("Continue").click();
  visible = await page.getByText("Logged in as test").isVisible();
  expect(visible).toBeTruthy();
  if (logout) await page.getByText("Logout").click();
}
