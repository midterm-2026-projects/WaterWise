import { expect, test } from "@playwright/test";

test.describe("Consumer portal end-to-end journey", () => {
  test("signs in, reviews notifications, billing and receipts, then explores consumption charts", async ({
    page,
  }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const resetResponse = await page.request.post("/api/test/notifications/reset");
    expect(resetResponse.status()).toBe(204);

    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "Sign in to your account" }),
    ).toBeVisible();
    await page.getByLabel("Email or username").fill("tenant@gmail.com");
    const passwordInput = page.getByLabel("Password", { exact: true });
    await passwordInput.fill("tenant123");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await page.getByRole("button", { name: "Show password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await page.getByRole("button", { name: "Hide password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");

    const historyResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/consumption") && response.status() === 200,
    );

    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page).toHaveURL(/\/consumer\/usage-metrics$/);
    await historyResponse;

    await expect(page.getByRole("heading", { name: "Usage Metrics" })).toBeVisible();
    await expect(page.getByTestId("analytics-grid")).toBeVisible();
    await expect(page.getByTestId("trend-graph-container")).toBeVisible();
    await expect(page.getByTestId("graph-node")).toHaveCount(7);

    await page.getByTestId("notification-trigger").click();
    await expect(page.getByTestId("section-bills")).toContainText("New meter reading");
    await expect(page.getByTestId("section-announcements")).toContainText(
      "Distribution advisory",
    );

    const billingNotification = page.getByTestId("notification-card-2026001");
    const announcementNotification = page.getByTestId("notification-card-2026002");
    await expect(billingNotification).toHaveAttribute("data-is-read", "false");
    await expect(announcementNotification).toHaveAttribute("data-is-read", "false");
    await expect(page.getByTestId("unread-badge")).toHaveText("2");

    const billingReadResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/notifications/2026001/read") &&
        response.request().method() === "PUT" &&
        response.status() === 200,
    );
    await billingNotification.click();
    await billingReadResponse;

    await expect(page).toHaveURL(/\/consumer\/billing-ledger\?receipt=official$/);
    await expect(
      page.getByRole("heading", { name: "Sucol Water System Official Receipt" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Close official receipt" }).click();

    await page.getByTestId("notification-trigger").click();
    await expect(billingNotification).toHaveAttribute("data-is-read", "true");
    await expect(page.getByTestId("unread-badge")).toHaveText("1");

    const announcementReadResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/notifications/2026002/read") &&
        response.request().method() === "PUT" &&
        response.status() === 200,
    );
    await announcementNotification.click();
    await announcementReadResponse;
    await expect(announcementNotification).toHaveAttribute("data-is-read", "true");
    await expect(page.getByTestId("unread-badge")).toHaveCount(0);
    await page.getByRole("button", { name: "Close notification center" }).click();

    await page.getByRole("link", { name: "Billing Ledger" }).click();
    await expect(page).toHaveURL(/\/consumer\/billing-ledger$/);
    await expect(page.getByRole("heading", { name: "Billing Ledger" })).toBeVisible();

    await expect(page.getByTestId("current-billing-card")).toBeVisible();
    await expect(page.getByTestId("outstanding-balance")).toContainText("450.00");
    await expect(page.getByTestId("due-date")).toHaveText("July 25, 2026");
    await expect(page.getByTestId("billing-history-table")).toBeVisible();
    await expect(page.getByTestId("history-row")).toHaveCount(3);
    await expect(page.getByTestId("view-receipt-INV-2026-006")).toBeDisabled();

    await page.getByTestId("view-receipt-INV-2026-005").click();
    await expect(page.getByTestId("receipt-modal-content")).toBeVisible();
    await expect(page.getByTestId("receipt-invoice")).toHaveText("INV-2026-005");
    await expect(page.getByTestId("receipt-diff")).toContainText("22.1");
    await expect(page.getByTestId("receipt-total-payable")).toContainText("390.00");
    await page.getByRole("button", { name: "Close receipt" }).click();
    await expect(page.getByTestId("receipt-modal-content")).toBeHidden();

    await page.getByRole("button", { name: "View Official Receipt" }).click();
    await expect(page).toHaveURL(/\/consumer\/billing-ledger\?receipt=official$/);
    await expect(
      page.getByRole("heading", { name: "Sucol Water System Official Receipt" }),
    ).toBeVisible();
    await expect(page.getByTestId("receipt-meter-name")).toHaveText("SWS-MTR-0412");
    await expect(page.getByTestId("receipt-final-total")).toContainText("450.00");
    await page.getByRole("button", { name: "Close official receipt" }).click();
    await expect(page).toHaveURL(/\/consumer\/billing-ledger$/);

    const refreshedHistoryResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/consumption") && response.status() === 200,
    );
    await page.getByRole("link", { name: "Usage Metrics" }).click();
    await refreshedHistoryResponse;
    await expect(page).toHaveURL(/\/consumer\/usage-metrics$/);

    const yearFilter = page.getByTestId("year-filter");
    await expect(yearFilter.locator("option")).toHaveText(["2025", "2026"]);
    await yearFilter.selectOption("2025");
    await expect(page.getByTestId("graph-node")).toHaveCount(12);
    await expect(page.getByTestId("axis-month-label").first()).toHaveText("January 2025");
    await expect(page.getByTestId("axis-month-label").last()).toHaveText("December 2025");

    await yearFilter.selectOption("2026");
    await expect(page.getByTestId("graph-node")).toHaveCount(7);
    await expect(page.getByTestId("axis-month-label").last()).toHaveText("July 2026");

    await page.getByRole("button", { name: "Open account menu" }).click();
    await page.getByRole("button", { name: "Log out" }).click();
    await expect(page).toHaveURL(/\/login$/);
    await page.getByLabel("Email or username").fill("tenant@gmail.com");
    await page.getByLabel("Password", { exact: true }).fill("tenant123");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page).toHaveURL(/\/consumer\/usage-metrics$/);

    await page.getByTestId("notification-trigger").click();
    await expect(page.getByTestId("notification-card-2026001")).toHaveAttribute(
      "data-is-read",
      "true",
    );
    await expect(page.getByTestId("notification-card-2026002")).toHaveAttribute(
      "data-is-read",
      "true",
    );
    await expect(page.getByTestId("unread-badge")).toHaveCount(0);

    const deleteResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/notifications/2026002") &&
        response.request().method() === "DELETE" &&
        response.status() === 200,
    );
    await page.getByRole("button", { name: "Delete Distribution advisory" }).click();
    await deleteResponse;
    await expect(page.getByTestId("notification-card-2026002")).toHaveCount(0);
    await page.getByRole("button", { name: "Close notification center" }).click();

    await page.getByRole("button", { name: "Open account menu" }).click();
    await page.getByRole("button", { name: "Log out" }).click();
    await page.getByLabel("Email or username").fill("tenant@gmail.com");
    await page.getByLabel("Password", { exact: true }).fill("tenant123");
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page).toHaveURL(/\/consumer\/usage-metrics$/);
    await page.getByTestId("notification-trigger").click();
    await expect(page.getByTestId("notification-card-2026002")).toHaveCount(0);
    await expect(page.getByTestId("notification-card-2026001")).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
});
