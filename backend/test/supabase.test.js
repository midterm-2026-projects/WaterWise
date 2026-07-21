import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { supabase } from "../config/supabase.js";

const REQUIRED_TABLES = ["consumers", "consumption", "notifications", "billing"];
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;

let connectionProbe;

describe("Supabase database connection", () => {
  beforeAll(async () => {
    connectionProbe = await supabase.from("consumers").select("id").limit(0);
  }, 15_000);

  it("has valid Supabase environment configuration", () => {
    expect(supabaseUrl).toBeTruthy();
    expect(supabaseKey).toBeTruthy();

    const parsedUrl = new URL(supabaseUrl);
    expect(parsedUrl.protocol).toBe("https:");
    expect(parsedUrl.hostname).toMatch(/\.supabase\.co$/);
  });

  it("initializes and connects the Supabase client", () => {
    expect(supabase).toBeDefined();
    expect(supabase.from).toBeTypeOf("function");
    expect(connectionProbe.error, connectionProbe.error?.message).toBeNull();
    expect(connectionProbe.status).toBe(200);
  });

  it(
    "allows SELECT requests to every application table",
    async () => {
      const results = await Promise.all(
        REQUIRED_TABLES.map(async (table) => {
          const { error } = await supabase.from(table).select("*").limit(0);
          return { table, error };
        })
      );

      const failures = results
        .filter(({ error }) => error)
        .map(({ table, error }) => `${table}: ${error.message}`);

      expect(failures, failures.join("\n")).toEqual([]);
    },
    15_000
  );
});

describe.sequential("Supabase application table operations", () => {
  const baseId = Math.floor(1_500_000_000 + Math.random() * 400_000_000);
  const consumerId = baseId;
  const consumptionId = baseId + 1;
  const notificationId = baseId + 2;
  const billingId = baseId + 3;
  const uniqueToken = randomUUID();
  const inserted = {};

  function expectNoError(error, operation) {
    expect(error, `${operation}: ${error?.message}`).toBeNull();
  }

  afterAll(async () => {
    await supabase.from("billing").delete().eq("id", billingId);
    await supabase.from("consumption").delete().eq("id", consumptionId);
    await supabase.from("notifications").delete().eq("id", notificationId);
    await supabase.from("consumers").delete().eq("id", consumerId);
  }, 15_000);

  it("uses a service-role key for backend write operations", () => {
    expect(
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      "Set SUPABASE_SERVICE_ROLE_KEY in backend/.env before running write tests."
    ).toBeTruthy();
  });

  it(
    "INSERTS isolated records into every application table",
    async () => {
      const consumerResult = await supabase
        .from("consumers")
        .insert({
          id: consumerId,
          username: `integration-${uniqueToken}`,
          full_name: "Supabase Integration Test",
          email: `integration-${uniqueToken}@waterwise.test`,
          purok_no: 1,
          password: `test-only-${uniqueToken}`,
          status: "active",
        })
        .select("*")
        .single();

      expectNoError(consumerResult.error, "INSERT consumers");
      inserted.consumers = consumerResult.data;

      const consumptionResult = await supabase
        .from("consumption")
        .insert({
          id: consumptionId,
          consumer_id: consumerId,
          reading_date: "2026-07-01",
          previous_reading: 10,
          present_reading: 20,
        })
        .select("*")
        .single();

      expectNoError(consumptionResult.error, "INSERT consumption");
      inserted.consumption = consumptionResult.data;

      const [notificationResult, billingResult] = await Promise.all([
        supabase
          .from("notifications")
          .insert({
            id: notificationId,
            announcement_type: "announcement",
            title: "Integration Test Notification",
            announcement_date: "2026-07-01",
            message: "Created by the Supabase integration test.",
          })
          .select("*")
          .single(),
        supabase
          .from("billing")
          .insert({
            id: billingId,
            consumption_id: consumptionId,
            user_id: consumerId,
            billing_date: "2026-07-01",
            due_date: "2026-07-31",
            total_bill: 150,
            remaining_balance: 150,
            status: "Unpaid",
          })
          .select("*")
          .single(),
      ]);

      expectNoError(notificationResult.error, "INSERT notifications");
      expectNoError(billingResult.error, "INSERT billing");
      inserted.notifications = notificationResult.data;
      inserted.billing = billingResult.data;

      expect(inserted.consumers.id).toBe(consumerId);
      expect(inserted.consumption.consumer_id).toBe(consumerId);
      expect(inserted.notifications.id).toBe(notificationId);
      expect(inserted.billing.consumption_id).toBe(consumptionId);
    },
    15_000
  );

  it(
    "SELECTS the inserted records from every application table",
    async () => {
      const results = await Promise.all(
        REQUIRED_TABLES.map((table) =>
          supabase.from(table).select("*").eq("id", inserted[table].id).single()
        )
      );

      results.forEach((result, index) => {
        const table = REQUIRED_TABLES[index];
        expectNoError(result.error, `SELECT ${table}`);
        expect(result.data).toMatchObject(inserted[table]);
      });
    },
    15_000
  );

  it(
    "UPDATES and returns records from every application table",
    async () => {
      const updates = [
        ["consumers", consumerId, { status: "inactive" }],
        ["consumption", consumptionId, { present_reading: 25 }],
        ["notifications", notificationId, { title: "Updated Integration Notification" }],
        ["billing", billingId, { status: "Paid", remaining_balance: 0 }],
      ];

      const results = await Promise.all(
        updates.map(([table, id, fields]) =>
          supabase.from(table).update(fields).eq("id", id).select("*").single()
        )
      );

      results.forEach((result, index) => {
        const [table, , expected] = updates[index];
        expectNoError(result.error, `UPDATE ${table}`);
        expect(result.data).toMatchObject(expected);
      });
    },
    15_000
  );
});
