import { useEffect, useState } from "react";
import { FiBookOpen, FiDroplet, FiFileText, FiGrid, FiMap, FiMessageSquare, FiUsers, FiX } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router";
import { MOCK_ROLE_STORAGE_KEY } from "../config/mockAuth";
import { getCurrentAccount, logout } from "../services/auth.service";
import {
  deleteNotification,
  fetchNotifications,
  markNotificationRead,
} from "../services/consumerPortal.service";
import Header from "./Header";
import NotificationBadgeTrigger from "./NotificationBadgeTrigger";
import NotificationPage from "../pages/NotificationPage";
import Sidebar from "./Sidebar";

const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    profile: "Barangay Official",
    userName: "Barangay Admin",
    basePath: "/admin",
    homePath: "/admin/dashboard",
    links: [
      { label: "Dashboard", path: "/admin/dashboard", Icon: FiGrid },
      { label: "Consumers", path: "/admin/consumers", Icon: FiUsers },
      { label: "Readings", path: "/admin/readings", Icon: FiBookOpen },
      { label: "Billings", path: "/admin/billings", Icon: FiFileText },
      { label: "Events", path: "/admin/events", Icon: FiMap },
      { label: "Announcements", path: "/admin/announcements", Icon: FiMessageSquare },
    ],
  },
  "meter-reader": {
    label: "Meter Reader",
    profile: "Field Personnel",
    userName: "Meter Reader",
    basePath: "/meter-reader",
    homePath: "/meter-reader/readings-entry",
    links: [
      { label: "Readings Entry", path: "/meter-reader/readings-entry", Icon: FiBookOpen },
      { label: "Consumer Directory", path: "/meter-reader/consumer-directory", Icon: FiUsers },
    ],
  },
  consumer: {
    label: "Consumer",
    profile: "Community Portal",
    userName: "Iverene Grace M. Causapin",
    basePath: "/consumer",
    homePath: "/consumer/usage-metrics",
    links: [
      { label: "Usage Metrics", path: "/consumer/usage-metrics", Icon: FiDroplet },
      { label: "Billing Ledger", path: "/consumer/billing-ledger", Icon: FiFileText },
      { label: "Profile Details", path: "/consumer/profile-details", Icon: FiUsers },
    ],
  },
};

function getRoleFromPath(pathname) {
  return Object.entries(ROLE_CONFIG).find(([, config]) =>
    pathname.startsWith(config.basePath),
  )?.[0];
}

function getStoredRole() {
  if (typeof window === "undefined") {
    return "admin";
  }

  const storedRole = window.localStorage.getItem(MOCK_ROLE_STORAGE_KEY);
  return ROLE_CONFIG[storedRole] ? storedRole : "admin";
}

function formatPageTitle(pathname, activeRole) {
  const currentLink = ROLE_CONFIG[activeRole].links.find(
    (link) => link.path === pathname,
  );

  return currentLink?.label ?? "Dashboard";
}

export default function AppLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathRole = getRoleFromPath(location.pathname);
  const [mockRole, setMockRole] = useState(getStoredRole);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [accountName, setAccountName] = useState("");
  const activeRole = pathRole ?? mockRole;
  const activeRoleConfig = ROLE_CONFIG[activeRole];

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  useEffect(() => {
    const controller = new AbortController();

    getCurrentAccount({ signal: controller.signal })
      .then(({ user }) => setAccountName(user?.name ?? user?.email ?? ""))
      .catch(() => setAccountName(""));

    if (activeRole === "consumer") {
      fetchNotifications({ signal: controller.signal })
        .then(setNotifications)
        .catch(() => setNotifications([]));
    } else {
      queueMicrotask(() => setNotifications([]));
    }

    return () => controller.abort();
  }, [activeRole]);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
    window.localStorage.removeItem(MOCK_ROLE_STORAGE_KEY);
    setMockRole("admin");
    setIsNotificationOpen(false);
    navigate("/login");
    }
  };

  const handleMarkNotificationAsRead = async (notificationId) => {
    try {
      await markNotificationRead(notificationId);
      setNotifications((currentNotifications) =>
        currentNotifications.map((item) =>
          item.id === notificationId ? { ...item, isRead: true } : item,
        ),
      );
    } catch {
      // Keep the unread state when the backend update fails.
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.category === "bill" && notification.actionPath) {
      setIsNotificationOpen(false);
      navigate(notification.actionPath);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotification(notificationId);
      setNotifications((currentNotifications) =>
        currentNotifications.filter((item) => item.id !== notificationId),
      );
    } catch {
      // Keep the notification visible when the backend dismissal fails.
    }
  };

  return (
    <div className="min-h-screen bg-transparent font-[Inter,system-ui,sans-serif] text-[#0F172A]">
      <Header
        accountName={accountName || activeRoleConfig.userName}
        activeRole={activeRole}
        activeRoleLabel={activeRoleConfig.label}
        notificationSlot={activeRole === "consumer" ? (
          <NotificationBadgeTrigger
            onToggleHub={() => setIsNotificationOpen((isOpen) => !isOpen)}
            unreadCount={unreadCount}
          />
        ) : null}
        onLogout={handleLogout}
        title="WaterWise"
      />

      <div className="mx-auto max-w-[1600px] lg:flex">
        <Sidebar
          activeRoleLabel={activeRoleConfig.label}
          items={activeRoleConfig.links}
          userName={accountName || activeRoleConfig.userName}
        />

        <main className="min-w-0 flex-1 pb-24 lg:pb-0">
          <div className="h-full px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-5 sm:mb-7">
                <h1 className="mt-1.5 text-2xl font-extrabold leading-tight tracking-[-0.04em] text-[#0F172A] sm:text-3xl">
                  {formatPageTitle(location.pathname, activeRole)}
                </h1>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>

      <div
        aria-hidden={!isNotificationOpen}
        className={[
          "fixed inset-0 z-40 bg-[#0F172A]/25 transition-opacity",
          isNotificationOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={() => setIsNotificationOpen(false)}
      />

      <aside
        aria-label="Notification center"
        className={[
          "fixed inset-y-0 right-0 z-50 h-full w-[min(92vw,26rem)] border-l border-slate-200 bg-[#F8FAFC] shadow-[0_24px_80px_rgba(15,23,42,0.2)] transition-transform duration-300 ease-out",
          isNotificationOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
          <div>
            <p className="text-sm font-bold text-[#0F172A]">
              Notification Center
            </p>
            <p className="text-xs font-medium text-slate-500">
              {unreadCount} unread alert{unreadCount === 1 ? "" : "s"}
            </p>
          </div>
          <button
            aria-label="Close notification center"
            className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-slate-200 bg-white text-[#0284C7] transition hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284C7] focus-visible:ring-offset-2"
            onClick={() => setIsNotificationOpen(false)}
            type="button"
          >
            <FiX aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <NotificationPage
          notifications={notifications}
          onDelete={handleDeleteNotification}
          onNotificationClick={handleNotificationClick}
          onMarkAsRead={handleMarkNotificationAsRead}
        />
      </aside>
    </div>
  );
}
