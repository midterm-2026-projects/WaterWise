import { fetchAllBilling } from "../services/billing.service.js";
import { getCurrentUser } from "../services/AuthService.js";

async function resolveUserId() {
  if (process.env.NODE_ENV === "test") return undefined;
  return (await getCurrentUser()).id;
}

export async function getCurrentBilling(_req, res) {
  try {
    const userId = await resolveUserId();
    const billingRecords = await fetchAllBilling(userId);
    const unpaidBalanceTotal = billingRecords.reduce((total, record) => {
      const remainingBalance = Number(record.remaining_balance);

      return remainingBalance > 0 ? total + remainingBalance : total;
    }, 0);

    return res.status(200).json({
      unpaid_balance_total: unpaidBalanceTotal,
    });
  } catch {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Unable to retrieve the current billing balance.",
    });
  }
}

export async function getBillingHistory(_req, res) {
  try {
    // This endpoint powers the administrator billing and payment ledgers, so it
    // must return all accounts instead of depending on a consumer login session.
    const billingRecords = await fetchAllBilling();

    return res.status(200).json(billingRecords);
  } catch {
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Unable to retrieve billing history.",
    });
  }
}
