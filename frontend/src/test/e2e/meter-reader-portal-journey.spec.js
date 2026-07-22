import { expect, test } from "@playwright/test";

test.describe("Meter Reader portal end-to-end journey", () => {
  test("signs in, opens consumption entry, enforces role access, and logs out", async ({
    page,
  }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "Sign in to your account" }),
    ).toBeVisible();
    await page.getByLabel("Email or username").fill("reader@gmail.com");
    await page.getByLabel("Password", { exact: true }).fill("reader123");
    const directoryResponse = page.waitForResponse((response) => response.url().endsWith("/api/consumers") && response.status() === 200);
    const readingsResponse = page.waitForResponse((response) => response.url().endsWith("/api/meter-readings/") && response.status() === 200);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await Promise.all([directoryResponse, readingsResponse]);

    await expect(page).toHaveURL(/\/meter-reader\/readings-entry$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Record Consumption Entry", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Select a consumer" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Choose a consumer first" })).toBeVisible();
    await expect(page.getByText("Meter Reader", { exact: true }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Record Consumption Entry" })).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Consumer Directory" })).toHaveCount(0);

    await page.getByPlaceholder("Search consumer name, number, or purok").fill("Maria");
    await expect(page.getByRole("button", { name: /Maria Santos/ })).toBeVisible();
    await page.getByRole("button", { name: /Maria Santos/ }).click();
    await expect(page.getByRole("heading", { name: "Record consumption", exact: true })).toBeVisible();
    await expect(page.getByText("C-1002 · Purok 2").last()).toBeVisible();
    await expect(page.getByLabel("Previous reading")).toHaveValue("111");
    await page.getByLabel("Current reading").fill("120");
    await expect(page.getByText("9 m³", { exact: true })).toBeVisible();

    const createResponse = page.waitForResponse((response) => response.url().endsWith("/api/meter-readings/") && response.request().method() === "POST" && response.status() === 201);
    await page.getByRole("button", { name: "Save consumption record" }).click();
    await createResponse;
    await expect(page.getByRole("status")).toContainText("Maria Santos");
    await expect(page.getByRole("table")).toContainText("120");

    await page.goto("/admin/dashboard");
    await expect(page).toHaveURL(/\/admin\/dashboard$/);
    await expect(
      page.getByRole("heading", { name: "This page is not available for your role" }),
    ).toBeVisible();
    await expect(page.getByText(/signed in as meter reader/i)).toBeVisible();
    await page.getByRole("link", { name: "Open my portal" }).click();
    await expect(page).toHaveURL(/\/meter-reader\/readings-entry$/);

    await page.getByRole("button", { name: "Open account menu" }).click();
    await page.getByRole("button", { name: "Log out" }).click();
    await expect(page).toHaveURL(/\/login$/);
    expect(pageErrors).toEqual([]);
  });
});
