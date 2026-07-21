import { supabase } from "../config/supabase.js";
import mockBillingData from "../data/mockBillingData.js";

const TABLE = "billing";

function unwrap({ data, error }) {
  if (error) {
    throw error;
  }

  return data;
}

export function fetchBillingRecords(userId) {
  if (process.env.NODE_ENV === "test") {
    return userId === undefined
      ? mockBillingData
      : mockBillingData.filter((record) => record.user_id === userId);
  }

  return fetchBillingRecordsFromSupabase(userId);
}

async function fetchBillingRecordsFromSupabase(userId) {
  if (process.env.WATERWISE_E2E === "true") {
    return [
      {
        id: 2026006,
        user_id: userId,
        billing_date: "2026-06-30",
        due_date: "2026-07-25",
        total_bill: 450,
        remaining_balance: 450,
        status: "Overdue",
        consumption: {
          previous_reading: 184.2,
          present_reading: 208.7,
          consumption: 24.5,
          reading_date: "2026-06-30",
        },
      },
      {
        id: 2026005,
        user_id: userId,
        billing_date: "2026-05-31",
        due_date: "2026-06-25",
        total_bill: 390,
        remaining_balance: 0,
        status: "Paid",
        consumption: {
          previous_reading: 162.1,
          present_reading: 184.2,
          consumption: 22.1,
          reading_date: "2026-05-31",
        },
      },
      {
        id: 2026004,
        user_id: userId,
        billing_date: "2026-04-30",
        due_date: "2026-05-25",
        total_bill: 370,
        remaining_balance: 0,
        status: "Paid",
        consumption: {
          previous_reading: 140.7,
          present_reading: 162.1,
          consumption: 21.4,
          reading_date: "2026-04-30",
        },
      },
    ];
  }

  let query = supabase
    .from(TABLE)
    .select("*, consumption(*)")
    .order("billing_date", { ascending: false });

  if (userId !== undefined) {
    query = query.eq("user_id", userId);
  }

  const result = await query;

  return unwrap(result) ?? [];
}

export function fetchBillingRecordById(id) {
  if (process.env.NODE_ENV === "test") {
    return mockBillingData.find((record) => record.id === id);
  }

  return fetchBillingRecordByIdFromSupabase(id);
}

async function fetchBillingRecordByIdFromSupabase(id) {
  const result = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return unwrap(result);
}

export function fetchBillingRecordByUserId(userId) {
  if (process.env.NODE_ENV === "test") {
    return mockBillingData.find((record) => record.user_id === userId);
  }

  return fetchBillingRecordByUserIdFromSupabase(userId);
}

async function fetchBillingRecordByUserIdFromSupabase(userId) {
  const result = await supabase
    .from(TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("billing_date", { ascending: false })
    .limit(1)
    .maybeSingle();

  return unwrap(result);
}

export function insertBillingRecord(billingRecord) {
  if (process.env.NODE_ENV === "test") {
    const nextId = Math.max(0, ...mockBillingData.map(({ id }) => id)) + 1;
    const insertedRecord = { id: nextId, ...billingRecord };
    mockBillingData.push(insertedRecord);
    return insertedRecord;
  }

  return insertBillingRecordIntoSupabase(billingRecord);
}

async function insertBillingRecordIntoSupabase(billingRecord) {
  const result = await supabase
    .from(TABLE)
    .insert(billingRecord)
    .select("*")
    .single();

  return unwrap(result);
}

export function updateBillingRecord(id, updatedFields) {
  if (process.env.NODE_ENV === "test") {
    const record = mockBillingData.find((item) => item.id === id);
    if (!record) return null;
    Object.assign(record, updatedFields);
    return record;
  }

  return updateBillingRecordInSupabase(id, updatedFields);
}

async function updateBillingRecordInSupabase(id, updatedFields) {
  const result = await supabase
    .from(TABLE)
    .update(updatedFields)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  return unwrap(result);
}

export function removeBillingRecord(id) {
  if (process.env.NODE_ENV === "test") {
    const index = mockBillingData.findIndex((record) => record.id === id);
    if (index === -1) return false;
    mockBillingData.splice(index, 1);
    return true;
  }

  return removeBillingRecordFromSupabase(id);
}

async function removeBillingRecordFromSupabase(id) {
  const result = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  return unwrap(result) !== null;
}