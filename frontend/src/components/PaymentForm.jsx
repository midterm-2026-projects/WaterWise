import { useState } from "react";
import { Banknote, CalendarDays, CreditCard, UserRound } from "lucide-react";

const initialState = { consumerName: "", currentBalance: "", amountPaid: "", paymentDate: "", paymentMethod: "" };
const inputClass = "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100";

function PaymentForm({ billingRecords = [], onSubmit = () => {} }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const balance = Number(form.currentBalance) || 0;
  const paid = Number(form.amountPaid) || 0;
  const remainingBalance = Math.max(balance - paid, 0);
  const paymentStatus = paid <= 0 ? "Unpaid" : paid >= balance ? "Paid" : "Partially Paid";

  const handleChange = ({ target: { name, value } }) => {
    if (name === "consumerName") {
      const billing = billingRecords.find(
        (record) => record.consumerName.toLowerCase() === value.trim().toLowerCase(),
      );
      setForm((previous) => ({
        ...previous,
        consumerName: value,
        currentBalance: billing ? String(billing.outstandingBalance || billing.amountDue) : previous.currentBalance,
      }));
    } else {
      setForm((previous) => ({ ...previous, [name]: value }));
    }
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.consumerName.trim()) nextErrors.consumerName = "Consumer Name is required.";
    if (!form.currentBalance) nextErrors.currentBalance = "Current Balance is required.";
    if (!form.amountPaid) nextErrors.amountPaid = "Amount Paid is required.";
    else if (Number(form.amountPaid) <= 0) nextErrors.amountPaid = "Amount Paid must be greater than zero.";
    else if (Number(form.amountPaid) > Number(form.currentBalance)) nextErrors.amountPaid = "Amount Paid cannot exceed balance.";
    if (!form.paymentDate) nextErrors.paymentDate = "Payment Date is required.";
    if (!form.paymentMethod.trim()) nextErrors.paymentMethod = "Payment Method is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, currentBalance: balance, amountPaid: paid, remainingBalance, paymentStatus });
    setForm(initialState);
    setErrors({});
  };

  const errorFor = (name) => errors[name] ? <p className="mt-1.5 text-xs font-semibold text-red-600" role="alert">{errors[name]}</p> : null;

  return (
    <form className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]" onSubmit={handleSubmit}>
      <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-white px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-200"><CreditCard className="h-5 w-5" /></span><div><h2 className="text-xl font-extrabold text-slate-900">Payment Form</h2><p className="mt-0.5 text-sm text-slate-500">Enter account and transaction details.</p></div></div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <div className="sm:col-span-2"><label className="text-sm font-bold text-slate-700" htmlFor="consumerName"><span className="inline-flex items-center gap-2"><UserRound className="h-4 w-4 text-sky-600" />Consumer Name</span></label><input className={inputClass} id="consumerName" list="payment-consumers" name="consumerName" onChange={handleChange} placeholder="Consumer Name" type="text" value={form.consumerName} /><datalist id="payment-consumers">{billingRecords.map((record) => <option key={record.id} value={record.consumerName} />)}</datalist>{errorFor("consumerName")}</div>
        <div><label className="text-sm font-bold text-slate-700" htmlFor="currentBalance">Current Balance</label><div className="relative"><span className="absolute left-3.5 top-[1.15rem] font-bold text-slate-400">₱</span><input className={`${inputClass} pl-8`} id="currentBalance" name="currentBalance" onChange={handleChange} placeholder="Current Balance" type="number" value={form.currentBalance} /></div>{errorFor("currentBalance")}</div>
        <div><label className="text-sm font-bold text-slate-700" htmlFor="amountPaid">Amount Paid</label><div className="relative"><span className="absolute left-3.5 top-[1.15rem] font-bold text-slate-400">₱</span><input className={`${inputClass} pl-8`} id="amountPaid" name="amountPaid" onChange={handleChange} placeholder="Amount Paid" type="number" value={form.amountPaid} /></div>{errorFor("amountPaid")}</div>
        <div><label className="text-sm font-bold text-slate-700" htmlFor="paymentDate"><span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-sky-600" />Payment Date</span></label><input className={inputClass} id="paymentDate" name="paymentDate" onChange={handleChange} type="date" value={form.paymentDate} />{errorFor("paymentDate")}</div>
        <div><label className="text-sm font-bold text-slate-700" htmlFor="paymentMethod">Payment Method</label><input className={inputClass} id="paymentMethod" name="paymentMethod" onChange={handleChange} placeholder="Payment Method" type="text" value={form.paymentMethod} />{errorFor("paymentMethod")}</div>

        <div className="grid gap-3 rounded-2xl bg-slate-950 p-4 text-white sm:col-span-2 sm:grid-cols-2">
          <div><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Remaining balance</p><p className="mt-2 font-mono text-2xl font-extrabold">₱{remainingBalance.toLocaleString()}</p></div>
          <div className="sm:text-right"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment status</p><span className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-sm font-bold ${paymentStatus === "Paid" ? "bg-emerald-400/15 text-emerald-300" : paymentStatus === "Partially Paid" ? "bg-amber-400/15 text-amber-300" : "bg-red-400/15 text-red-300"}`}>{paymentStatus}</span></div>
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6"><button className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 focus:ring-4 focus:ring-sky-200" type="submit"><Banknote className="h-5 w-5" />Record Payment</button></div>
    </form>
  );
}

export default PaymentForm;
