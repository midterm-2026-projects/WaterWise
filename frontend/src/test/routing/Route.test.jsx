import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter, useLocation } from "react-router";
import { AppRoutes } from "../../App";
import { MOCK_ROLE_STORAGE_KEY } from "../../config/mockAuth";

function LocationProbe({ onChange }) {
  const location = useLocation();
  onChange(location.pathname);
  return null;
}

function renderRoute(path = "/") {
  let pathname = path;
  const view = render(
    <MemoryRouter initialEntries={[path]}>
      <LocationProbe onChange={(nextPathname) => { pathname = nextPathname; }} />
      <AppRoutes />
    </MemoryRouter>,
  );

  return {
    ...view,
    getPathname: () => pathname,
  };
}

describe("App routing", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("redirects the app root to the login page", async () => {
    const route = renderRoute("/");

    expect(
      await screen.findByRole("heading", { name: /sign in to your account/i }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(route.getPathname()).toBe("/login");
    });
  });

  it("redirects unknown routes back to login", async () => {
    const route = renderRoute("/missing-page");

    expect(
      await screen.findByRole("heading", { name: /sign in to your account/i }),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(route.getPathname()).toBe("/login");
    });
  });

  it("signs in with the selected mock role and opens the matching route", async () => {
    const user = userEvent.setup();
    const route = renderRoute("/login");

    await user.type(screen.getByLabelText(/email or username/i), "consumer@sucolwater.local");
    await user.type(screen.getByLabelText(/^password$/i), "password");
    await user.click(screen.getByRole("button", { name: /^sign in$/i }));

    expect(
      await screen.findByRole("heading", { level: 1, name: /usage metrics/i }),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("analytics-grid")).toBeInTheDocument();
    expect(route.getPathname()).toBe("/consumer/usage-metrics");
  });

  it("redirects role base paths to their default portal pages", async () => {
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "admin");
    const adminRoute = renderRoute("/admin");

    expect(
      await screen.findByRole("heading", { level: 1, name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("notification-trigger")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(adminRoute.getPathname()).toBe("/admin/dashboard");
    });

    adminRoute.unmount();
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "meter-reader");
    const meterReaderRoute = renderRoute("/meter-reader");

    expect(
      await screen.findByRole("heading", { level: 1, name: /record consumption entry/i }),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("notification-trigger")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(meterReaderRoute.getPathname()).toBe("/meter-reader/readings-entry");
    });

    meterReaderRoute.unmount();
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "consumer");
    const consumerRoute = renderRoute("/consumer");

    expect(
      await screen.findByRole("heading", { level: 1, name: /usage metrics/i }),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("notification-trigger")).toBeInTheDocument();
    await waitFor(() => {
      expect(consumerRoute.getPathname()).toBe("/consumer/usage-metrics");
    });
  });

  it("renders the admin dashboard inside the shared layout", async () => {
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "admin");
    renderRoute("/admin/dashboard");

    expect(
      await screen.findByRole("heading", { level: 1, name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("admin-dashboard")).toBeInTheDocument();
    expect(screen.getByText(/water operations overview/i)).toBeInTheDocument();
  });

  it("shows a route access error when no mock role is signed in", async () => {
    renderRoute("/consumer/profile-details");

    expect(
      await screen.findByRole("heading", {
        name: /this page is not available for your role/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/no mock user is signed in/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go to login/i })).toHaveAttribute(
      "href",
      "/login",
    );
  });

  it("shows a role access error when the saved mock role opens another portal", async () => {
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "consumer");
    renderRoute("/admin/dashboard");

    expect(
      await screen.findByRole("heading", {
        name: /this page is not available for your role/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/signed in as consumer/i)).toBeInTheDocument();
    expect(screen.getByText(/admin workspace/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 1, name: /dashboard/i }),
    ).not.toBeInTheDocument();
  });

  it("shows a role access error when a role opens an unassigned section under its own portal", async () => {
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "consumer");
    renderRoute("/consumer/readings");

    expect(
      await screen.findByRole("heading", {
        name: /this page is not available for your role/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/signed in as consumer/i)).toBeInTheDocument();
    expect(screen.queryByText(/mock workspace/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open my portal/i })).toHaveAttribute(
      "href",
      "/consumer/usage-metrics",
    );
  });

  it("lets the user return to their allowed portal from the route access error", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "meter-reader");
    const route = renderRoute("/consumer/profile-details");

    await user.click(await screen.findByRole("link", { name: /open my portal/i }));

    expect(
      await screen.findByRole("heading", { level: 1, name: /record consumption entry/i }),
    ).toBeInTheDocument();
    expect(route.getPathname()).toBe("/meter-reader/readings-entry");
  });

  it("renders the consumer billing ledger route", async () => {
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "consumer");
    renderRoute("/consumer/billing-ledger");

    expect(
      await screen.findByRole("heading", { level: 1, name: /billing ledger/i }),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("current-billing-card")).toBeInTheDocument();
    expect(await screen.findByTestId("billing-history-table")).toBeInTheDocument();
  });

  it("renders the consumer usage metrics route", async () => {
    window.localStorage.setItem(MOCK_ROLE_STORAGE_KEY, "consumer");
    renderRoute("/consumer/usage-metrics");

    expect(
      await screen.findByRole("heading", { level: 1, name: /usage metrics/i }),
    ).toBeInTheDocument();
    expect(await screen.findByTestId("analytics-grid")).toBeInTheDocument();
    expect(screen.getByTestId("trend-graph-container")).toBeInTheDocument();
  });
});
