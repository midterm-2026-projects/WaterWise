import { expect, test } from "@playwright/test";

test.describe("Admin Analytics Dashboard end-to-end journey", () => {
  test("admin signs in and explores analytics dashboard", async ({ page }) => {
    const pageErrors = [];
    const apiErrors = [];

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    page.on("response", (response) => {
      if (response.status() >= 400 && !response.url().includes("/favicon")) {
        apiErrors.push({
          url: response.url(),
          status: response.status(),
        });
      }
    });

    /*
    ========================
    LOGIN
    ========================
    */

    await page.goto("/login");

    await expect(
      page.getByRole("heading", {
        name: "Sign in to your account",
      }),
    ).toBeVisible();

    await page.getByLabel("Email or username").fill("admin@gmail.com");

    await page
      .getByLabel("Password", {
        exact: true,
      })
      .fill("admin123");

    await page
      .getByRole("button", {
        name: "Sign in",
        exact: true,
      })
      .click();
    /*
    ========================
    ADMIN DASHBOARD
    ========================
    */

    await expect(page).toHaveURL(/\/admin\/dashboard$/);

    /*
    ========================
    ANALYTICS PAGE
    ========================
    */

    await page.goto("/admin/analytics");

    await expect(page).toHaveURL(/\/admin\/analytics$/);

    /*
    ========================
    ANALYTICS HEADER
    ========================
    */

    await expect(page.getByLabel("Consumption summary")).toBeVisible();

    /*
    ========================
    CONSUMPTION CARDS
    ========================
    */

    await expect(page.getByTestId("overall-consumption-card")).toBeVisible();

    await expect(page.getByTestId("monthly-consumption-card")).toBeVisible();

    await expect(page.getByTestId("yearly-consumption-card")).toBeVisible();

    /*
    ========================
    PUROK ANALYTICS
    ========================
    */

    await expect(page.getByTestId("purok-consumption-card")).toBeVisible();

    await expect(page.getByTestId("purok-consumption-trend")).toBeVisible();

    await expect(page.getByTestId("purok-comparison-chart")).toBeVisible();

    /*
    ========================
    AI DECISION SUPPORT
    ========================
    */

    await expect(
      page.getByTestId("anomaly-recommendation-section"),
    ).toBeVisible();

    await expect(page.getByTestId("anomaly-card")).toBeVisible();

    await expect(page.getByTestId("recommendation-card")).toBeVisible();

    /*
    ========================
    PAGE ERROR CHECK
    ========================
    */

    expect(pageErrors).toEqual([]);
  });
});
