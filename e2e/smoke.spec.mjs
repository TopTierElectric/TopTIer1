import { test, expect } from "@playwright/test";

for (const route of ["/", "/services", "/service-areas", "/contact"]) {
  test(`smoke ${route}`, async ({ page, request }) => {
    const response = await request.get(route);
    expect(
      response.ok(),
      `Expected non-error status for ${route}`,
    ).toBeTruthy();

    await page.goto(route);
    await expect(page).toHaveTitle(/./);
  });
}
