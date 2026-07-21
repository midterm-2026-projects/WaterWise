# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.analytics-dashboard.spec.js >> Admin Analytics Dashboard end-to-end journey >> admin signs in and explores analytics dashboard
- Location: src\test\e2e\admin.analytics-dashboard.spec.js:4:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin\/dashboard$/
Received string:  "http://localhost:5174/login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "http://localhost:5174/login"

```

```yaml
- main:
  - complementary:
    - paragraph: WaterWise
    - heading "Every drop, clearly understood." [level=1]
    - paragraph: Secure access to Sucol Water System services, wherever you are.
  - paragraph: Secure sign in
  - heading "Sign in to your account" [level=2]
  - paragraph: Use the credentials assigned to your WaterWise account.
  - text: Email or username
  - textbox "Email or username":
    - /placeholder: name@sucolwater.gov
    - text: admin_tester
  - text: Password
  - textbox "Password":
    - /placeholder: Enter password
    - text: testpass123
  - button "Show password"
  - button "Sign in"
  - text: Your session is protected and role-based.
  - status: Invalid email or password.
```

# Test source

```ts
  1   | import { expect, test } from "@playwright/test";
  2   | 
  3   | test.describe("Admin Analytics Dashboard end-to-end journey", () => {
  4   |   test("admin signs in and explores analytics dashboard", async ({ page }) => {
  5   |     const pageErrors = [];
  6   |     const apiErrors = [];
  7   | 
  8   |     page.on("pageerror", (error) => {
  9   |       pageErrors.push(error.message);
  10  |     });
  11  | 
  12  |     page.on("response", (response) => {
  13  |       if (response.status() >= 400 && !response.url().includes("/favicon")) {
  14  |         apiErrors.push({
  15  |           url: response.url(),
  16  |           status: response.status(),
  17  |         });
  18  |       }
  19  |     });
  20  | 
  21  |     /*
  22  |     ========================
  23  |     LOGIN
  24  |     ========================
  25  |     */
  26  | 
  27  |     await page.goto("/login");
  28  | 
  29  |     await expect(
  30  |       page.getByRole("heading", {
  31  |         name: "Sign in to your account",
  32  |       }),
  33  |     ).toBeVisible();
  34  | 
  35  |     await page.getByLabel("Email or username").fill("admin_tester");
  36  | 
  37  |     await page
  38  |       .getByLabel("Password", {
  39  |         exact: true,
  40  |       })
  41  |       .fill("testpass123");
  42  | 
  43  |     await page
  44  |   .getByRole("button", {
  45  |     name: "Sign in",
  46  |     exact: true,
  47  |   })
  48  |   .click();
  49  | 
  50  | 
  51  | await page.waitForTimeout(3000);
  52  | 
  53  | 
  54  | console.log(
  55  |   "CURRENT URL:",
  56  |   page.url()
  57  | );
  58  |     /*
  59  |     ========================
  60  |     ADMIN DASHBOARD
  61  |     ========================
  62  |     */
  63  | 
> 64  |     await expect(page).toHaveURL(/\/admin\/dashboard$/);
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  65  | 
  66  |     /*
  67  |     ========================
  68  |     ANALYTICS PAGE
  69  |     ========================
  70  |     */
  71  | 
  72  |     await page.goto("/admin/analytics");
  73  | 
  74  |     await expect(page).toHaveURL(/\/admin\/analytics$/);
  75  | 
  76  |     /*
  77  |     ========================
  78  |     ANALYTICS HEADER
  79  |     ========================
  80  |     */
  81  | 
  82  |     await expect(page.getByLabel("Consumption summary")).toBeVisible();
  83  | 
  84  |     /*
  85  |     ========================
  86  |     CONSUMPTION CARDS
  87  |     ========================
  88  |     */
  89  | 
  90  |     await expect(page.getByTestId("overall-consumption-card")).toBeVisible();
  91  | 
  92  |     await expect(page.getByTestId("monthly-consumption-card")).toBeVisible();
  93  | 
  94  |     await expect(page.getByTestId("yearly-consumption-card")).toBeVisible();
  95  | 
  96  |     /*
  97  |     ========================
  98  |     PUROK ANALYTICS
  99  |     ========================
  100 |     */
  101 | 
  102 |     await expect(page.getByTestId("purok-consumption-card")).toBeVisible();
  103 | 
  104 |     await expect(page.getByTestId("purok-consumption-trend")).toBeVisible();
  105 | 
  106 |     await expect(page.getByTestId("purok-comparison-chart")).toBeVisible();
  107 | 
  108 |     /*
  109 |     ========================
  110 |     AI DECISION SUPPORT
  111 |     ========================
  112 |     */
  113 | 
  114 |     await expect(
  115 |       page.getByTestId("anomaly-recommendation-section"),
  116 |     ).toBeVisible();
  117 | 
  118 |     await expect(page.getByTestId("anomaly-card")).toBeVisible();
  119 | 
  120 |     await expect(page.getByTestId("recommendation-card")).toBeVisible();
  121 | 
  122 |     /*
  123 |     ========================
  124 |     PAGE ERROR CHECK
  125 |     ========================
  126 |     */
  127 | 
  128 |     expect(pageErrors).toEqual([]);
  129 |   });
  130 | });
  131 | 
```