import { test, expect } from '@playwright/test';

// challenge 1
test('locked user cannot login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: /login/i }).click();

  await expect(
    page.locator('[data-test="error"]')
  ).toBeVisible();
});
// challenge 2
test('sort products by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.locator('.product_sort_container')
    .selectOption('lohi');

  const prices = await page.locator('.inventory_item_price').allTextContents();

  const firstPrice = parseFloat(prices[0].replace('$', ''));
  const secondPrice = parseFloat(prices[1].replace('$', ''));

  expect(firstPrice).toBeLessThanOrEqual(secondPrice);
});

// challenge 3
test('logout successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.locator('#react-burger-menu-btn').click();
  await page.getByText('Logout').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});