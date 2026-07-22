import { useCallback, useEffect, useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import BillingSummaryCard from "./BillingSummaryCard";
import BillingHistoryTable from "./BillingHistoryTable";
import PaymentForm from "./PaymentForm";

import { fetchBillingHistory } from "../api/billingAPI";
import { recordPayment } from "../api/paymentAPI";

function BillingManagement() {
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedReceipt, setSelectedReceipt] =
    useState(null);

  const handleSelectReceipt = (receipt) => {
    setSelectedReceipt(receipt);
  };

  const loadBillingHistory = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      setBillingHistory(await fetchBillingHistory());
    } catch (requestError) {
      setError(requestError?.response?.data?.message ?? requestError.message ?? "Unable to load billing history.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetchBillingHistory()
      .then((records) => {
        if (active) setBillingHistory(records);
      })
      .catch((requestError) => {
        if (active) setError(requestError?.response?.data?.message ?? requestError.message ?? "Unable to load billing history.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handlePaymentSubmit = async (payment) => {
    const billing = billingHistory.find(
      (record) => record.consumerName.toLowerCase() === payment.consumerName.trim().toLowerCase(),
    );

    if (!billing) {
      setError("No billing record matches that consumer name.");
      return;
    }

    try {
      setError("");
      await recordPayment({
        billingId: billing.id,
        amount: payment.amountPaid,
        paymentDate: payment.paymentDate,
      });
      setSelectedReceipt(null);
      await loadBillingHistory();
    } catch (requestError) {
      setError(requestError?.response?.data?.message ?? requestError.message ?? "Unable to record payment.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-6 space-y-6">
          <h1 className="text-3xl font-bold">
            Billing Management
          </h1>

          <p className="text-gray-600">
            Manage consumer billing
            records and payment
            transactions.
          </p>

          <BillingSummaryCard
            billingData={billingHistory}
          />

          {error && (
            <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-4 text-red-700" role="alert">
              <span>{error}</span>
              <button className="font-semibold underline" onClick={loadBillingHistory} type="button">Try again</button>
            </div>
          )}

          {loading ? (
            <div className="rounded-lg bg-white p-8 text-center text-slate-500">Loading billing records...</div>
          ) : (
            <BillingHistoryTable
              historyData={billingHistory}
              onSelectReceipt={handleSelectReceipt}
            />
          )}

          <PaymentForm
            billingRecords={billingHistory}
            onSubmit={handlePaymentSubmit}
          />

          {selectedReceipt && (
            <section
              data-testid="receipt-details"
              className="bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Receipt Details
              </h2>

              <div className="space-y-2">
                <p
                  data-testid="receipt-invoice"
                >
                  <strong>
                    Invoice Number:
                  </strong>{" "}
                  {
                    selectedReceipt.invoiceNumber
                  }
                </p>

                <p
                  data-testid="receipt-period"
                >
                  <strong>
                    Billing Period:
                  </strong>{" "}
                  {
                    selectedReceipt.billingPeriod
                  }
                </p>

                <p
                  data-testid="receipt-reading-date"
                >
                  <strong>
                    Reading Date:
                  </strong>{" "}
                  {
                    selectedReceipt.readingDate
                  }
                </p>

                <p
                  data-testid="receipt-consumption"
                >
                  <strong>
                    Consumption:
                  </strong>{" "}
                  {
                    selectedReceipt.cubicMetersConsumed
                  }{" "}
                  m³
                </p>

                <p
                  data-testid="receipt-amount"
                >
                  <strong>
                    Amount Due:
                  </strong>{" "}
                  ₱
                  {selectedReceipt.amountDue.toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </p>

                <p
                  data-testid="receipt-status"
                >
                  <strong>
                    Status:
                  </strong>{" "}
                  {
                    selectedReceipt.status
                  }
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{" "}
                  {
                    selectedReceipt.address
                  }
                </p>

                <p>
                  <strong>
                    Previous Reading:
                  </strong>{" "}
                  {
                    selectedReceipt.previousReading
                  }
                </p>

                <p>
                  <strong>
                    Current Reading:
                  </strong>{" "}
                  {
                    selectedReceipt.currentReading
                  }
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default BillingManagement;
