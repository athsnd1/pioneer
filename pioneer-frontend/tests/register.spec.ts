import { test, expect } from "@playwright/test";

test("user can register", async ({ page }) => {

    await page.goto("/register");

    await page.getByLabel("Email").fill(`playwright${Date.now()}@test.com`);
    await page.getByLabel("Password").fill("Playuser1234");

    await page.getByRole("button", { name: "Create Account" }).click();

    await expect(page).toHaveURL("/register");

});