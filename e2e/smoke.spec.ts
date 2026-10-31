import { test, expect } from "@playwright/test";

test("la home carga correctamente", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();
  await expect(page.locator("body")).toBeVisible();
});
