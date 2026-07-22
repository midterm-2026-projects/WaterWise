import { consumerModel } from "../models/consumerModel.js";

function serviceError(code, message) {
  return Object.assign(new Error(message), { code });
}

export const consumerService = {
  async listConsumers() {
    const consumers = await consumerModel.findAll();
    return consumers.map((consumer) => ({
      id: consumer.id,
      consumerNo: consumer.username || `C-${String(consumer.id).padStart(4, "0")}`,
      consumerName: consumer.full_name,
      email: consumer.email,
      purok: consumer.purok_no == null ? "Unassigned" : `Purok ${consumer.purok_no}`,
      status: consumer.status ?? "active",
    }));
  },

  async getProfile(profileId) {
    if (!profileId) {
      throw serviceError("UNAUTHORIZED", "An authenticated consumer is required.");
    }

    const profile = await consumerModel.findProfile(profileId, profileId);

    if (!profile) {
      throw serviceError("PROFILE_NOT_FOUND", "Profile record could not be found.");
    }

    const [readings, invoices] = await Promise.all([
      consumerModel.findReadings(profileId, profileId),
      consumerModel.findInvoices(profileId, profileId),
    ]);

    return {
      ...profile,
      readings,
      invoices,
    };
  },
};
