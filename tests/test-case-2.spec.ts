import { expect, test } from "@playwright/test";
import createAccount from "../helpers/create-account.spec";
test("Login User with correct email and password", async ({ page }) => {
  await page.goto("https://automationexercise.com/", {
    waitUntil: "domcontentloaded",
  });

  await createAccount(page, true);

  await page.goto("https://automationexercise.com/", {
    waitUntil: "domcontentloaded",
  });
  await page.getByText("Signup / Login").click();

  let visible = await page.getByText("Login to your account").isVisible();
  expect(visible).toBeTruthy();

  await page.locator('//*[@data-qa="login-email"]').fill("test@test.test");
  await page.getByPlaceholder("Password").fill("test");
  await page.getByText("Login", { exact: true }).click();

  visible = await page.getByText("Logged in as test").isVisible();
  expect(visible).toBeTruthy();

  await page.getByText("Delete Account").click();
  visible = await page.getByText("ACCOUNT DELETED!").isVisible();
  expect(visible).toBeTruthy();
});
