import { test, expect } from "@playwright/test";
import createAccount from "../helpers/create-account.spec";

test("Register User", async ({ page }) => {
  await page.goto("https://automationexercise.com/", {
    waitUntil: "domcontentloaded",
  });

  await createAccount(page, false);

  await page.getByText("Delete Account").click();
  let visible = await page.getByText("ACCOUNT DELETED!").isVisible();
  expect(visible).toBeTruthy();

  await page.getByText("Continue").click();
});
