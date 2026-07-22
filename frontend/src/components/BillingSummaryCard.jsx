import { CheckCircle2, CircleDollarSign, Clock3, FileText, WalletCards } from "lucide-react";

function BillingSummaryCard({ billingData = [] }) {
  const totalBills = billingData.length;
  const paidBills = billingData.filter((bill) => bill.status === "Paid").length;
  const partiallyPaidBills = billingData.filter((bill) => bill.status === "Partially Paid").length;
  const unpaidBills = billingData.filter((bill) => bill.status === "Unpaid").length;
  const totalBilling = billingData.reduce((total, bill) => total + Number(bill.amountDue ?? 0), 0);

  const summaryCards = [
    { title: "Total Bills", value: totalBills, testId: "total-bills-value", Icon: FileText, tone: "bg-sky-100 text-sky-700" },
    { title: "Paid Bills", value: paidBills, testId: "paid-bills-value", Icon: CheckCircle2, tone: "bg-emerald-100 text-emerald-700" },
    { title: "Partially Paid", value: partiallyPaidBills, testId: "partially-paid-value", Icon: Clock3, tone: "bg-amber-100 text-amber-700" },
    { title: "Unpaid Bills", value: unpaidBills, testId: "unpaid-bills-value", Icon: WalletCards, tone: "bg-red-100 text-red-700" },
    { title: "Total Billing", value: `₱${totalBilling.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, testId: "total-billing-value", Icon: CircleDollarSign, tone: "bg-indigo-100 text-indigo-700" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {summaryCards.map(({ Icon, ...card }) => (
        <article className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg" data-testid={card.testId.replace("-value", "-card")} key={card.title}>
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.tone}`}><Icon className="h-5 w-5" /></span>
          <h3 className="mt-4 text-sm font-bold text-slate-500">{card.title}</h3>
          <p className="mt-1 break-words text-2xl font-extrabold tracking-tight text-slate-900" data-testid={card.testId}>{card.value}</p>
        </article>
      ))}
    </div>
  );
}

export default BillingSummaryCard;
