import { expect, test } from "@playwright/test";

test.describe("Admin event management end-to-end journey", () => {
  test("exercises the event form, preview, records, validation, refresh, and CRUD controls", async ({
    page,
  }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: "Sign in to your account" }),
    ).toBeVisible();
    await page.getByLabel("Email or username").fill("admin@gmail.com");
    await page.getByLabel("Password", { exact: true }).fill("admin123");

    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await expect(page).toHaveURL(/\/admin\/dashboard$/);

    const initialEventsResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/events/") &&
        response.request().method() === "GET" &&
        response.status() === 200,
    );
    await page.getByRole("link", { name: "Events" }).click();
    await initialEventsResponse;
    await expect(page).toHaveURL(/\/admin\/events$/);
    await expect(page.getByRole("heading", { name: "Event Management" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Create Event" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Selected Event" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Event Records" })).toBeVisible();
    await expect(page.getByText("Barangay Assembly", { exact: true })).toBeVisible();

    const assemblyRow = page.getByRole("row").filter({ hasText: "Barangay Assembly" });
    await expect(assemblyRow).toContainText("Barangay Hall");
    await expect(assemblyRow).toContainText("Upcoming");
    await assemblyRow.getByRole("button", { name: "Edit" }).click();
    await expect(page.getByRole("heading", { name: "Edit Event" })).toBeVisible();
    await expect(page.getByPlaceholder("Event Title")).toHaveValue("Barangay Assembly");
    const selectedEventPreview = page.getByRole("heading", { name: "Selected Event" }).locator("..");
    await expect(selectedEventPreview).toContainText("Barangay Assembly");
    await expect(selectedEventPreview).toContainText("2026-07-10 - 09:00 AM");
    await expect(selectedEventPreview).toContainText("Barangay Hall");
    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByRole("heading", { name: "Create Event" })).toBeVisible();
    await expect(page.getByPlaceholder("Event Title")).toHaveValue("");

    const invalidResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/events/") &&
        response.request().method() === "POST" &&
        response.status() === 400,
    );
    await page.getByRole("button", { name: "Save Event" }).click();
    await invalidResponse;
    await expect(page.getByRole("alert")).toContainText("Event validation failed.");

    const retryResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/events/") &&
        response.request().method() === "GET" &&
        response.status() === 200,
    );
    await page.getByRole("button", { name: "Try again" }).click();
    await retryResponse;
    await expect(page.getByRole("alert")).toHaveCount(0);

    const eventTitle = "Water Conservation Seminar";
    const updatedTitle = "Water Conservation Workshop";

    await page.getByPlaceholder("Event Title").fill(eventTitle);
    await page.getByPlaceholder("Event Description").fill(
      "A practical seminar about reducing household water consumption.",
    );
    await page.locator('input[name="date"]').fill("2026-08-20");
    await page.locator('input[name="time"]').fill("09:30");
    await page.getByPlaceholder("Location").fill("Barangay Hall");
    await page.getByPlaceholder("Event Tags").fill("Conservation, Community");

    const createResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/events/") &&
        response.request().method() === "POST" &&
        response.status() === 201,
    );
    await page.getByRole("button", { name: "Save Event" }).click();
    await createResponse;

    const createdRow = page.getByRole("row").filter({ hasText: eventTitle });
    await expect(createdRow).toBeVisible();
    await expect(createdRow).toContainText("2026-08-20 - 09:30");
    await expect(createdRow).toContainText("ConservationCommunity");

    await createdRow.getByRole("button", { name: "Edit" }).click();
    await expect(page.getByRole("heading", { name: "Edit Event" })).toBeVisible();
    await expect(page.getByPlaceholder("Event Title")).toHaveValue(eventTitle);
    await page.getByPlaceholder("Event Title").fill(updatedTitle);

    const updateResponse = page.waitForResponse(
      (response) =>
        /\/api\/events\/\d+$/.test(new URL(response.url()).pathname) &&
        response.request().method() === "PUT" &&
        response.status() === 200,
    );
    await page.getByRole("button", { name: "Update Event" }).click();
    await updateResponse;

    const updatedRow = page.getByRole("row").filter({ hasText: updatedTitle });
    await expect(updatedRow).toBeVisible();
    await expect(page.getByText(eventTitle, { exact: true })).toHaveCount(0);

    const deleteResponse = page.waitForResponse(
      (response) =>
        /\/api\/events\/\d+$/.test(new URL(response.url()).pathname) &&
        response.request().method() === "DELETE" &&
        response.status() === 200,
    );
    await updatedRow.getByRole("button", { name: "Delete" }).click();
    await deleteResponse;
    await expect(page.getByText(updatedTitle, { exact: true })).toHaveCount(0);

    const refreshResponse = page.waitForResponse(
      (response) =>
        response.url().endsWith("/api/events/") &&
        response.request().method() === "GET" &&
        response.status() === 200,
    );
    await page.getByRole("button", { name: "Refresh events" }).click();
    await refreshResponse;
    await expect(page.getByText("Barangay Assembly", { exact: true })).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
});
