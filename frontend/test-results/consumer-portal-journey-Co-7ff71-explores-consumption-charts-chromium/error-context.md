# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: consumer-portal-journey.spec.js >> Consumer portal end-to-end journey >> signs in, reviews notifications, billing and receipts, then explores consumption charts
- Location: src\test\e2e\consumer-portal-journey.spec.js:4:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForResponse: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e6]:
          - img [ref=e8]
          - generic [ref=e10]:
            - heading "WaterWise" [level=1] [ref=e11]
            - paragraph [ref=e12]: Sucol Water System
        - generic [ref=e13]:
          - generic [ref=e14]: consumer
          - button "Open system notifications" [ref=e15]:
            - img [ref=e16]
          - button "Open account menu" [ref=e20]:
            - img [ref=e22]
            - img [ref=e25]
    - generic [ref=e27]:
      - complementary [ref=e28]:
        - generic [ref=e29]:
          - navigation "Consumer navigation" [ref=e30]:
            - list [ref=e31]:
              - listitem [ref=e32]:
                - link "Usage Metrics" [active] [ref=e33] [cursor=pointer]:
                  - /url: /consumer/usage-metrics
                  - img [ref=e34]
                  - generic [ref=e36]: Usage Metrics
              - listitem [ref=e37]:
                - link "Billing Ledger" [ref=e38] [cursor=pointer]:
                  - /url: /consumer/billing-ledger
                  - img [ref=e39]
                  - generic [ref=e42]: Billing Ledger
              - listitem [ref=e43]:
                - link "Profile Details" [ref=e44] [cursor=pointer]:
                  - /url: /consumer/profile-details
                  - img [ref=e45]
                  - generic [ref=e50]: Profile Details
              - listitem [ref=e51]:
                - link "Analytics" [ref=e52] [cursor=pointer]:
                  - /url: /admin/analytics
                  - img [ref=e53]
                  - generic [ref=e58]: Analytics
          - generic [ref=e60]:
            - img [ref=e62]
            - generic [ref=e65]:
              - paragraph [ref=e66]: Juan Dela Cruz
              - paragraph [ref=e67]: Consumer
      - main [ref=e68]:
        - generic [ref=e70]:
          - heading "Usage Metrics" [level=1] [ref=e72]
          - generic [ref=e73]:
            - alert [ref=e74]:
              - generic [ref=e75]: Unauthorized.
              - button "Try again" [ref=e76]
            - generic [ref=e77]:
              - generic [ref=e78]:
                - generic [ref=e79]:
                  - heading "Current Balance" [level=3] [ref=e80]
                  - paragraph [ref=e81]: Outstanding account total
                - generic [ref=e82]:
                  - generic [ref=e83]: ₱0.00
                  - generic [ref=e84]: Active amount due
              - generic [ref=e85]:
                - text: Total Consumption
                - heading "0 m³" [level=3] [ref=e86]
              - generic [ref=e87]:
                - text: Average Monthly Usage
                - heading "0 m³" [level=3] [ref=e88]
              - generic [ref=e89]:
                - text: Highest Consumption Month
                - heading "None" [level=3] [ref=e90]
            - generic [ref=e91]:
              - generic [ref=e92]:
                - generic [ref=e93]:
                  - paragraph [ref=e94]: Usage trend
                  - heading "Monthly consumption" [level=3] [ref=e95]
                - generic [ref=e96]:
                  - generic [ref=e97]: Volume (m³)
                  - generic [ref=e98]:
                    - generic [ref=e99]: Year
                    - combobox "Year" [ref=e100]:
                      - option "All" [selected]
              - application [ref=e104]
    - complementary "Notification center" [ref=e111]:
      - generic [ref=e112]:
        - generic [ref=e113]:
          - paragraph [ref=e114]: Notification Center
          - paragraph [ref=e115]: 0 unread alerts
        - button "Close notification center" [ref=e116]:
          - img [ref=e117]
      - generic [ref=e120]:
        - heading "Updates for you" [level=3] [ref=e121]
        - paragraph [ref=e122]: Bills and community notices in one place.
        - generic [ref=e123]:
          - generic [ref=e124]:
            - heading "Account bills" [level=4] [ref=e125]
            - generic [ref=e127] [cursor=pointer]:
              - img [ref=e129]
              - generic [ref=e132]:
                - heading "New meter reading" [level=5] [ref=e133]
                - paragraph [ref=e134]: Your June 2026 meter reading is now available.
              - button "Delete New meter reading" [ref=e135]:
                - img [ref=e136]
          - generic [ref=e138]:
            - heading "Community announcements" [level=4] [ref=e139]
            - generic [ref=e141] [cursor=pointer]:
              - img [ref=e143]
              - generic [ref=e146]:
                - heading "Distribution advisory" [level=5] [ref=e147]
                - paragraph [ref=e148]: Purok 3 maintenance window is scheduled for field validation.
              - button "Delete Distribution advisory" [ref=e149]:
                - img [ref=e150]
  - generic [ref=e152]: "0"
```

# Test source

```ts
  12  | 
  13  |     await page.goto("/login");
  14  |     await expect(
  15  |       page.getByRole("heading", { name: "Sign in to your account" }),
  16  |     ).toBeVisible();
  17  |     await page.getByLabel("Email or username").fill("tenant@gmail.com");
  18  |     const passwordInput = page.getByLabel("Password", { exact: true });
  19  |     await passwordInput.fill("tenant123");
  20  |     await expect(passwordInput).toHaveAttribute("type", "password");
  21  |     await page.getByRole("button", { name: "Show password" }).click();
  22  |     await expect(passwordInput).toHaveAttribute("type", "text");
  23  |     await page.getByRole("button", { name: "Hide password" }).click();
  24  |     await expect(passwordInput).toHaveAttribute("type", "password");
  25  | 
  26  |     const historyResponse = page.waitForResponse(
  27  |       (response) =>
  28  |         response.url().endsWith("/api/consumption") && response.status() === 200,
  29  |     );
  30  | 
  31  |     await page.getByRole("button", { name: "Sign in", exact: true }).click();
  32  |     await expect(page).toHaveURL(/\/consumer\/usage-metrics$/);
  33  |     await historyResponse;
  34  | 
  35  |     await expect(page.getByRole("heading", { name: "Usage Metrics" })).toBeVisible();
  36  |     await expect(page.getByTestId("analytics-grid")).toBeVisible();
  37  |     await expect(page.getByTestId("trend-graph-container")).toBeVisible();
  38  |     await expect(page.getByTestId("graph-node")).toHaveCount(7);
  39  | 
  40  |     await page.getByTestId("notification-trigger").click();
  41  |     await expect(page.getByTestId("section-bills")).toContainText("New meter reading");
  42  |     await expect(page.getByTestId("section-announcements")).toContainText(
  43  |       "Distribution advisory",
  44  |     );
  45  | 
  46  |     const billingNotification = page.getByTestId("notification-card-2026001");
  47  |     const announcementNotification = page.getByTestId("notification-card-2026002");
  48  |     await expect(billingNotification).toHaveAttribute("data-is-read", "false");
  49  |     await expect(announcementNotification).toHaveAttribute("data-is-read", "false");
  50  |     await expect(page.getByTestId("unread-badge")).toHaveText("2");
  51  | 
  52  |     const billingReadResponse = page.waitForResponse(
  53  |       (response) =>
  54  |         response.url().endsWith("/api/notifications/2026001/read") &&
  55  |         response.request().method() === "PUT" &&
  56  |         response.status() === 200,
  57  |     );
  58  |     await billingNotification.click();
  59  |     await billingReadResponse;
  60  | 
  61  |     await expect(page).toHaveURL(/\/consumer\/billing-ledger\?receipt=official$/);
  62  |     await expect(
  63  |       page.getByRole("heading", { name: "Sucol Water System Official Receipt" }),
  64  |     ).toBeVisible();
  65  |     await page.getByRole("button", { name: "Close official receipt" }).click();
  66  | 
  67  |     await page.getByTestId("notification-trigger").click();
  68  |     await expect(billingNotification).toHaveAttribute("data-is-read", "true");
  69  |     await expect(page.getByTestId("unread-badge")).toHaveText("1");
  70  | 
  71  |     const announcementReadResponse = page.waitForResponse(
  72  |       (response) =>
  73  |         response.url().endsWith("/api/notifications/2026002/read") &&
  74  |         response.request().method() === "PUT" &&
  75  |         response.status() === 200,
  76  |     );
  77  |     await announcementNotification.click();
  78  |     await announcementReadResponse;
  79  |     await expect(announcementNotification).toHaveAttribute("data-is-read", "true");
  80  |     await expect(page.getByTestId("unread-badge")).toHaveCount(0);
  81  |     await page.getByRole("button", { name: "Close notification center" }).click();
  82  | 
  83  |     await page.getByRole("link", { name: "Billing Ledger" }).click();
  84  |     await expect(page).toHaveURL(/\/consumer\/billing-ledger$/);
  85  |     await expect(page.getByRole("heading", { name: "Billing Ledger" })).toBeVisible();
  86  | 
  87  |     await expect(page.getByTestId("current-billing-card")).toBeVisible();
  88  |     await expect(page.getByTestId("outstanding-balance")).toContainText("450.00");
  89  |     await expect(page.getByTestId("due-date")).toHaveText("July 25, 2026");
  90  |     await expect(page.getByTestId("billing-history-table")).toBeVisible();
  91  |     await expect(page.getByTestId("history-row")).toHaveCount(3);
  92  |     await expect(page.getByTestId("view-receipt-INV-2026-006")).toBeDisabled();
  93  | 
  94  |     await page.getByTestId("view-receipt-INV-2026-005").click();
  95  |     await expect(page.getByTestId("receipt-modal-content")).toBeVisible();
  96  |     await expect(page.getByTestId("receipt-invoice")).toHaveText("INV-2026-005");
  97  |     await expect(page.getByTestId("receipt-diff")).toContainText("22.1");
  98  |     await expect(page.getByTestId("receipt-total-payable")).toContainText("390.00");
  99  |     await page.getByRole("button", { name: "Close receipt" }).click();
  100 |     await expect(page.getByTestId("receipt-modal-content")).toBeHidden();
  101 | 
  102 |     await page.getByRole("button", { name: "View Official Receipt" }).click();
  103 |     await expect(page).toHaveURL(/\/consumer\/billing-ledger\?receipt=official$/);
  104 |     await expect(
  105 |       page.getByRole("heading", { name: "Sucol Water System Official Receipt" }),
  106 |     ).toBeVisible();
  107 |     await expect(page.getByTestId("receipt-meter-name")).toHaveText("SWS-MTR-0412");
  108 |     await expect(page.getByTestId("receipt-final-total")).toContainText("450.00");
  109 |     await page.getByRole("button", { name: "Close official receipt" }).click();
  110 |     await expect(page).toHaveURL(/\/consumer\/billing-ledger$/);
  111 | 
> 112 |     const refreshedHistoryResponse = page.waitForResponse(
      |                                           ^ Error: page.waitForResponse: Test timeout of 30000ms exceeded.
  113 |       (response) =>
  114 |         response.url().endsWith("/api/consumption") && response.status() === 200,
  115 |     );
  116 |     await page.getByRole("link", { name: "Usage Metrics" }).click();
  117 |     await refreshedHistoryResponse;
  118 |     await expect(page).toHaveURL(/\/consumer\/usage-metrics$/);
  119 | 
  120 |     const yearFilter = page.getByTestId("year-filter");
  121 |     await expect(yearFilter.locator("option")).toHaveText(["2025", "2026"]);
  122 |     await yearFilter.selectOption("2025");
  123 |     await expect(page.getByTestId("graph-node")).toHaveCount(12);
  124 |     await expect(page.getByTestId("axis-month-label").first()).toHaveText("January 2025");
  125 |     await expect(page.getByTestId("axis-month-label").last()).toHaveText("December 2025");
  126 | 
  127 |     await yearFilter.selectOption("2026");
  128 |     await expect(page.getByTestId("graph-node")).toHaveCount(7);
  129 |     await expect(page.getByTestId("axis-month-label").last()).toHaveText("July 2026");
  130 | 
  131 |     await page.getByRole("button", { name: "Open account menu" }).click();
  132 |     await page.getByRole("button", { name: "Log out" }).click();
  133 |     await expect(page).toHaveURL(/\/login$/);
  134 |     await page.getByLabel("Email or username").fill("tenant@gmail.com");
  135 |     await page.getByLabel("Password", { exact: true }).fill("tenant123");
  136 |     await page.getByRole("button", { name: "Sign in", exact: true }).click();
  137 |     await expect(page).toHaveURL(/\/consumer\/usage-metrics$/);
  138 | 
  139 |     await page.getByTestId("notification-trigger").click();
  140 |     await expect(page.getByTestId("notification-card-2026001")).toHaveAttribute(
  141 |       "data-is-read",
  142 |       "true",
  143 |     );
  144 |     await expect(page.getByTestId("notification-card-2026002")).toHaveAttribute(
  145 |       "data-is-read",
  146 |       "true",
  147 |     );
  148 |     await expect(page.getByTestId("unread-badge")).toHaveCount(0);
  149 | 
  150 |     const deleteResponse = page.waitForResponse(
  151 |       (response) =>
  152 |         response.url().endsWith("/api/notifications/2026002") &&
  153 |         response.request().method() === "DELETE" &&
  154 |         response.status() === 200,
  155 |     );
  156 |     await page.getByRole("button", { name: "Delete Distribution advisory" }).click();
  157 |     await deleteResponse;
  158 |     await expect(page.getByTestId("notification-card-2026002")).toHaveCount(0);
  159 |     await page.getByRole("button", { name: "Close notification center" }).click();
  160 | 
  161 |     await page.getByRole("button", { name: "Open account menu" }).click();
  162 |     await page.getByRole("button", { name: "Log out" }).click();
  163 |     await page.getByLabel("Email or username").fill("tenant@gmail.com");
  164 |     await page.getByLabel("Password", { exact: true }).fill("tenant123");
  165 |     await page.getByRole("button", { name: "Sign in", exact: true }).click();
  166 |     await expect(page).toHaveURL(/\/consumer\/usage-metrics$/);
  167 |     await page.getByTestId("notification-trigger").click();
  168 |     await expect(page.getByTestId("notification-card-2026002")).toHaveCount(0);
  169 |     await expect(page.getByTestId("notification-card-2026001")).toBeVisible();
  170 |     expect(pageErrors).toEqual([]);
  171 |   });
  172 | });
  173 | 
```