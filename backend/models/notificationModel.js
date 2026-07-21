import { supabase } from "../config/supabase.js";

const NOTIFICATIONS_TABLE = "notifications";
const READS_TABLE = "notification_reads";
const BILLING_TYPE = "billing alert";
const DISMISSED_READ_AT = "9999-12-31T23:59:59.999999+00:00";

let supportsDismissedAt;

const e2eNotificationSeeds = [
  {
    id: 2026001,
    consumer_id: 2,
    profile_id: 2,
    announcement_type: "Billing Alert",
    category: "bill",
    title: "New meter reading",
    message: "Your June 2026 meter reading is now available.",
    is_read: false,
  },
  {
    id: 2026002,
    consumer_id: null,
    profile_id: 2,
    announcement_type: "Administrative Announcement",
    category: "announcement",
    title: "Distribution advisory",
    message: "Purok 3 maintenance window is scheduled for field validation.",
    is_read: false,
  },
];

let e2eNotifications = e2eNotificationSeeds.map((notification) => ({ ...notification }));

const defaultUnitTestNotifications = [
  {
    id: "valid-alert-101",
    profile_id: "owner-uuid-101",
    category: "bill",
    title: "New meter reading",
    message: "A new meter reading is available.",
    is_read: false,
  },
  {
    id: "alert-id-purok-1",
    profile_id: "original-owner-purok-1",
    category: "announcement",
    title: "Administrative announcement",
    message: "An administrative announcement is available.",
    is_read: false,
  },
];

let unitTestNotifications = process.env.NODE_ENV === "test"
  ? defaultUnitTestNotifications.map((notification) => ({ ...notification }))
  : null;

function unwrap({ data, error }) {
  if (error) throw error;
  return data;
}

function isBillingNotification(notification) {
  return String(notification.announcement_type ?? "").trim().toLowerCase() === BILLING_TYPE;
}

function belongsToConsumer(notification, consumerId) {
  if (!isBillingNotification(notification)) return notification.consumer_id === null;
  return String(notification.consumer_id) === String(consumerId);
}

function mapNotification(notification, consumerId, readIds = new Set()) {
  const billingNotification = isBillingNotification(notification);

  return {
    ...notification,
    profile_id: billingNotification ? notification.consumer_id : consumerId,
    category: billingNotification ? "bill" : "announcement",
    is_read: readIds.has(String(notification.id)),
  };
}

async function findNotificationState(notificationIds, consumerId) {
  if (notificationIds.length === 0) {
    return { readIds: new Set(), dismissedIds: new Set() };
  }

  let result = await supabase
    .from(READS_TABLE)
    .select(
      supportsDismissedAt === false
        ? "notification_id, read_at"
        : "notification_id, read_at, dismissed_at"
    )
    .eq("consumer_id", consumerId)
    .in("notification_id", notificationIds);

  if (
    result.error &&
    String(result.error.message).includes("notification_reads.dismissed_at")
  ) {
    supportsDismissedAt = false;
    result = await supabase
      .from(READS_TABLE)
      .select("notification_id, read_at")
      .eq("consumer_id", consumerId)
      .in("notification_id", notificationIds);
  } else if (!result.error) {
    supportsDismissedAt = true;
  }

  const rows = unwrap(result) ?? [];
  return {
    readIds: new Set(
      rows
        .filter(
          ({ read_at, dismissed_at }) =>
            read_at && !dismissed_at && !String(read_at).startsWith("9999-12-31")
        )
        .map(({ notification_id }) => String(notification_id))
    ),
    dismissedIds: new Set(
      rows
        .filter(
          ({ read_at, dismissed_at }) =>
            dismissed_at || String(read_at).startsWith("9999-12-31")
        )
        .map(({ notification_id }) => String(notification_id))
    ),
  };
}

async function findProductionNotification(id, consumerId) {
  const result = await supabase
    .from(NOTIFICATIONS_TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const notification = unwrap(result);
  if (!notification || !belongsToConsumer(notification, consumerId)) return null;

  const { readIds, dismissedIds } = await findNotificationState(
    [notification.id],
    consumerId
  );
  if (dismissedIds.has(String(notification.id))) return null;
  return mapNotification(notification, consumerId, readIds);
}

export const notificationModel = {
  async findAll(profileId) {
    if (process.env.NODE_ENV === "test" && unitTestNotifications) {
      return unitTestNotifications
        .filter((notification) => notification.profile_id === profileId)
        .map((notification) => ({ ...notification }));
    }

    if (process.env.WATERWISE_E2E === "true") {
      return e2eNotifications
        .filter((notification) => notification.profile_id === profileId)
        .map((notification) => ({ ...notification }));
    }

    const result = await supabase
      .from(NOTIFICATIONS_TABLE)
      .select("*")
      .or(`consumer_id.eq.${profileId},consumer_id.is.null`)
      .order("announcement_date", { ascending: false });

    const notifications = (unwrap(result) ?? []).filter((notification) =>
      belongsToConsumer(notification, profileId)
    );
    const { readIds, dismissedIds } = await findNotificationState(
      notifications.map(({ id }) => id),
      profileId
    );

    return notifications
      .filter(({ id }) => !dismissedIds.has(String(id)))
      .map((notification) => mapNotification(notification, profileId, readIds));
  },

  async findById(id, profileId) {
    if (process.env.NODE_ENV === "test" && unitTestNotifications) {
      const notification = unitTestNotifications.find(
        (item) => String(item.id) === String(id)
      );
      return notification ? { ...notification } : null;
    }

    if (process.env.WATERWISE_E2E === "true") {
      const notification = e2eNotifications.find(
        (item) => String(item.id) === String(id)
      );
      return notification ? { ...notification } : null;
    }

    return findProductionNotification(id, profileId);
  },

  async updateReadStatus(id, isRead, profileId) {
    if (process.env.NODE_ENV === "test" && unitTestNotifications) {
      const notification = unitTestNotifications.find(
        (item) => String(item.id) === String(id)
      );
      if (!notification) return null;
      notification.is_read = isRead;
      return { ...notification };
    }

    if (process.env.WATERWISE_E2E === "true") {
      const notification = e2eNotifications.find(
        (item) => String(item.id) === String(id)
      );
      if (!notification) return null;
      notification.is_read = isRead;
      return { ...notification };
    }

    const notification = await findProductionNotification(id, profileId);
    if (!notification) return null;

    if (isRead) {
      unwrap(
        await supabase.from(READS_TABLE).upsert(
          {
            notification_id: notification.id,
            consumer_id: profileId,
            read_at: new Date().toISOString(),
          },
          { onConflict: "notification_id,consumer_id" }
        )
      );
    } else {
      unwrap(
        await supabase
          .from(READS_TABLE)
          .delete()
          .eq("notification_id", notification.id)
          .eq("consumer_id", profileId)
      );
    }

    return { ...notification, is_read: isRead };
  },

  async dismiss(id, profileId) {
    if (process.env.NODE_ENV === "test" && unitTestNotifications) {
      const index = unitTestNotifications.findIndex(
        (item) => String(item.id) === String(id)
      );
      if (index === -1) return false;
      unitTestNotifications.splice(index, 1);
      return true;
    }

    if (process.env.WATERWISE_E2E === "true") {
      const index = e2eNotifications.findIndex(
        (item) => String(item.id) === String(id)
      );
      if (index === -1) return false;
      e2eNotifications.splice(index, 1);
      return true;
    }

    const notification = await findProductionNotification(id, profileId);
    if (!notification) return false;

    const baseState = {
      notification_id: notification.id,
      consumer_id: profileId,
    };
    let result = await supabase.from(READS_TABLE).upsert(
      supportsDismissedAt === false
        ? { ...baseState, read_at: DISMISSED_READ_AT }
        : {
            ...baseState,
            read_at: new Date().toISOString(),
            dismissed_at: new Date().toISOString(),
          },
      { onConflict: "notification_id,consumer_id" }
    );

    if (
      result.error &&
      String(result.error.message).includes("notification_reads.dismissed_at")
    ) {
      supportsDismissedAt = false;
      result = await supabase.from(READS_TABLE).upsert(
        { ...baseState, read_at: DISMISSED_READ_AT },
        { onConflict: "notification_id,consumer_id" }
      );
    }

    unwrap(result);

    return true;
  },

  __resetStorage(newSeeds) {
    if (process.env.NODE_ENV === "test") {
      unitTestNotifications = newSeeds.map((notification) => ({ ...notification }));
    }
  },

  __resetE2EStorage() {
    if (process.env.WATERWISE_E2E === "true") {
      e2eNotifications = e2eNotificationSeeds.map((notification) => ({ ...notification }));
    }
  },
};
