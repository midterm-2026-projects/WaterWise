import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router";
import AppLayout from "./components/AppLayout";
import RouteAccessError from "./components/RouteAccessError";
import { MOCK_ROLE_STORAGE_KEY } from "./config/mockAuth";
import BillingLedger from "./pages/BillingLedger";
import ConsumerProfile from "./pages/ConsumerProfile";
import Login from "./pages/Login";
import UsageMetrics from "./pages/UsageMetrics";

const portalRoutes = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Consumers", path: "/admin/consumers" },
  { label: "Readings", path: "/admin/readings" },
  { label: "Billings", path: "/admin/billings" },
  { label: "Events", path: "/admin/events" },
  { label: "Announcements", path: "/admin/announcements" },
  { label: "Readings Entry", path: "/meter-reader/readings-entry" },
  { label: "Consumer Directory", path: "/meter-reader/consumer-directory" },
  { label: "Profile Details", path: "/consumer/profile-details" },
  { label: "Billing Ledger", path: "/consumer/billing-ledger" },
  { label: "Usage Metrics", path: "/consumer/usage-metrics" },
];

const roleAccess = {
  admin: {
    homePath: "/admin/dashboard",
    label: "Admin",
    paths: [
      "/admin",
      "/admin/dashboard",
      "/admin/consumers",
      "/admin/readings",
      "/admin/billings",
      "/admin/events",
      "/admin/announcements",
    ],
  },
  "meter-reader": {
    homePath: "/meter-reader/readings-entry",
    label: "Meter Reader",
    paths: [
      "/meter-reader",
      "/meter-reader/readings-entry",
      "/meter-reader/consumer-directory",
    ],
  },
  consumer: {
    homePath: "/consumer/usage-metrics",
    label: "Consumer",
    paths: [
      "/consumer",
      "/consumer/profile-details",
      "/consumer/billing-ledger",
      "/consumer/usage-metrics",
    ],
  },
};

function findRouteLabel(pathname) {
  return portalRoutes.find((route) => route.path === pathname)?.label ?? "Dashboard";
}

function MockPortalPage() {
  const location = useLocation();
  const pageTitle = findRouteLabel(location.pathname);

  return (
    <AppLayout>
      <section className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-[0_18px_56px_rgba(15,23,42,0.06)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[#0284C7]">
          Mock workspace
        </p>
        <h2 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.02em] text-[#0F172A]">
          {pageTitle}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          This canvas is ready for the {pageTitle.toLowerCase()} page view.
          Data-connected modules can be placed here without changing the shared
          WaterWise layout shell.
        </p>
      </section>
    </AppLayout>
  );
}

function getStoredMockRole() {
  const storedRole = window.localStorage.getItem(MOCK_ROLE_STORAGE_KEY);
  return roleAccess[storedRole] ? storedRole : null;
}

function RoleRouteGuard({ children, requiredRole }) {
  const location = useLocation();
  const storedRole = getStoredMockRole();
  const requestedRole = roleAccess[requiredRole];

  if (!storedRole) {
    return (
      <RouteAccessError
        allowedPath="/login"
        currentRoleLabel="No active mock user"
        primaryActionLabel="Go to login"
        requestedRoleLabel={requestedRole.label}
      />
    );
  }

  if (storedRole && storedRole !== requiredRole) {
    return (
      <RouteAccessError
        allowedPath={roleAccess[storedRole].homePath}
        currentRoleLabel={roleAccess[storedRole].label}
        requestedRoleLabel={requestedRole.label}
      />
    );
  }

  if (!requestedRole.paths.includes(location.pathname)) {
    return (
      <RouteAccessError
        allowedPath={requestedRole.homePath}
        currentRoleLabel={requestedRole.label}
        requestedRoleLabel={requestedRole.label}
      />
    );
  }

  return children;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/login" />} path="/" />
      <Route element={<Login />} path="/login" />
      <Route
        element={
          <RoleRouteGuard requiredRole="admin">
            <Navigate replace to="/admin/dashboard" />
          </RoleRouteGuard>
        }
        path="/admin"
      />
      <Route
        element={
          <RoleRouteGuard requiredRole="admin">
            <MockPortalPage />
          </RoleRouteGuard>
        }
        path="/admin/:section"
      />
      <Route
        element={
          <RoleRouteGuard requiredRole="meter-reader">
            <Navigate replace to="/meter-reader/readings-entry" />
          </RoleRouteGuard>
        }
        path="/meter-reader"
      />
      <Route
        element={
          <RoleRouteGuard requiredRole="meter-reader">
            <MockPortalPage />
          </RoleRouteGuard>
        }
        path="/meter-reader/:section"
      />
      <Route
        element={
          <RoleRouteGuard requiredRole="consumer">
            <Navigate replace to="/consumer/usage-metrics" />
          </RoleRouteGuard>
        }
        path="/consumer"
      />
      <Route
        element={
          <RoleRouteGuard requiredRole="consumer">
            <AppLayout>
              <ConsumerProfile />
            </AppLayout>
          </RoleRouteGuard>
        }
        path="/consumer/profile-details"
      />
      <Route
        element={
          <RoleRouteGuard requiredRole="consumer">
            <AppLayout>
              <BillingLedger />
            </AppLayout>
          </RoleRouteGuard>
        }
        path="/consumer/billing-ledger"
      />
      <Route
        element={
          <RoleRouteGuard requiredRole="consumer">
            <AppLayout>
              <UsageMetrics />
            </AppLayout>
          </RoleRouteGuard>
        }
        path="/consumer/usage-metrics"
      />
      <Route
        element={
          <RoleRouteGuard requiredRole="consumer">
            <MockPortalPage />
          </RoleRouteGuard>
        }
        path="/consumer/:section"
      />
      <Route element={<Navigate replace to="/login" />} path="*" />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
