import { useEffect, useState } from "react";

function PaymentForm({ onSubmit = () => {} }) {
  const initialState = {
    consumerName: "",
    currentBalance: "",
    amountPaid: "",
    paymentDate: "",
    paymentMethod: "",
  };

  const [form, setForm] = useState(initialState);
  const [remainingBalance, setRemainingBalance] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const balance = Number(form.currentBalance) || 0;
    const paid = Number(form.amountPaid) || 0;

    const remaining = balance - paid;

    setRemainingBalance(remaining < 0 ? 0 : remaining);

    if (balance > 0 && paid >= balance) {
      setPaymentStatus("Paid");
    } else {
      setPaymentStatus("Unpaid");
    }
  }, [form.currentBalance, form.amountPaid]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.consumerName.trim()) {
      newErrors.consumerName = "Consumer Name is required.";
    }

    if (!form.currentBalance) {
      newErrors.currentBalance = "Current Balance is required.";
    }

    if (!form.amountPaid) {
      newErrors.amountPaid = "Amount Paid is required.";
    } else if (Number(form.amountPaid) <= 0) {
      newErrors.amountPaid =
        "Amount Paid must be greater than zero.";
    } else if (
      Number(form.amountPaid) >
      Number(form.currentBalance)
    ) {
      newErrors.amountPaid =
        "Amount Paid cannot exceed balance.";
    }

    if (!form.paymentDate) {
      newErrors.paymentDate = "Payment Date is required.";
    }

    if (!form.paymentMethod.trim()) {
      newErrors.paymentMethod =
        "Payment Method is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      currentBalance: Number(form.currentBalance),
      amountPaid: Number(form.amountPaid),
      remainingBalance,
      paymentStatus,
    });

    setForm(initialState);
    setRemainingBalance(0);
    setPaymentStatus("Unpaid");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 space-y-4"
    >
      <h2 className="text-2xl font-bold">
        Payment Form
      </h2>

      <div>
        <label htmlFor="consumerName">
          Consumer Name
        </label>

        <input
          id="consumerName"
          name="consumerName"
          type="text"
          placeholder="Consumer Name"
          value={form.consumerName}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.consumerName && (
          <p role="alert" className="text-red-500">
            {errors.consumerName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="currentBalance">
          Current Balance
        </label>

        <input
          id="currentBalance"
          name="currentBalance"
          type="number"
          placeholder="Current Balance"
          value={form.currentBalance}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.currentBalance && (
          <p role="alert" className="text-red-500">
            {errors.currentBalance}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="amountPaid">
          Amount Paid
        </label>

        <input
          id="amountPaid"
          name="amountPaid"
          type="number"
          placeholder="Amount Paid"
          value={form.amountPaid}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.amountPaid && (
          <p role="alert" className="text-red-500">
            {errors.amountPaid}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="paymentDate">
          Payment Date
        </label>

        <input
          id="paymentDate"
          name="paymentDate"
          type="date"
          value={form.paymentDate}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.paymentDate && (
          <p role="alert" className="text-red-500">
            {errors.paymentDate}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="paymentMethod">
          Payment Method
        </label>

        <input
          id="paymentMethod"
          name="paymentMethod"
          type="text"
          placeholder="Payment Method"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.paymentMethod && (
          <p role="alert" className="text-red-500">
            {errors.paymentMethod}
          </p>
        )}
      </div>

      <div className="bg-gray-100 rounded p-4">
        <p>
          <strong>Remaining Balance:</strong>{" "}
          {remainingBalance}
        </p>

        <p>
          <strong>Payment Status:</strong>{" "}
          {paymentStatus}
        </p>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Record Payment
      </button>
    </form>
  );
}

export default PaymentForm;