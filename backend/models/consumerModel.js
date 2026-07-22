import { supabase } from "../config/supabase.js";

function assertOwnAccount(profileId, sessionUserId) {
  if (!profileId || profileId !== sessionUserId) {
    throw new Error("SQL permission violation: Cross-account dataset reading blocked.");
  }
}

function unwrap({ data, error }) {
  if (error) {
    throw error;
  }

  return data;
}

export const consumerModel = {
  async findProfile(profileId, sessionUserId) {
    assertOwnAccount(profileId, sessionUserId);

    if (process.env.WATERWISE_E2E === "true") {
      return {
        id: profileId,
        accountId: "ACC-3022",
        name: "Iverene Grace M. Causapin",
        full_name: "Iverene Grace M. Causapin",
        email: "tenant@gmail.com",
        phone: "0917 000 1212",
        purok: "Purok 4",
        purok_no: 4,
        house_number: "12-B",
        meter_number: "SWS-MTR-0412",
        status: "active",
      };
    }

    const result = await supabase
      .from("consumers")
      .select("id, username, full_name, email, purok_no, status, created_at, updated_at")
      .eq("id", profileId)
      .maybeSingle();

    const profile = unwrap(result);

    return profile
      ? {
          ...profile,
          name: profile.full_name,
          purok: profile.purok_no == null ? null : `Purok ${profile.purok_no}`,
        }
      : null;
  },

  async findReadings(profileId, sessionUserId) {
    assertOwnAccount(profileId, sessionUserId);

    if (process.env.WATERWISE_E2E === "true") {
      return [
        {
          id: 2026006,
          consumer_id: profileId,
          reading_date: "2026-06-30",
          previous_reading: 184.2,
          present_reading: 208.7,
          consumption: 24.5,
        },
      ];
    }

    const result = await supabase
      .from("consumption")
      .select("*")
      .eq("consumer_id", profileId)
      .order("reading_date", { ascending: false });

    return unwrap(result) ?? [];
  },

  async findInvoices(profileId, sessionUserId) {
    assertOwnAccount(profileId, sessionUserId);

    if (process.env.WATERWISE_E2E === "true") {
      return [
        {
          id: 2026006,
          user_id: profileId,
          billing_date: "2026-06-30",
          due_date: "2026-07-25",
          total_bill: 450,
          remaining_balance: 450,
          status: "Overdue",
        },
      ];
    }

    const result = await supabase
      .from("billing")
      .select("*")
      .eq("user_id", profileId)
      .order("billing_date", { ascending: false });

    return unwrap(result) ?? [];
  },

  async executeWrite(sessionRole) {
    if (sessionRole === "consumer") {
      throw new Error("SQL permission violation: Table security configuration rejects all write attempts.");
    }

    return { success: true };
  },
};
