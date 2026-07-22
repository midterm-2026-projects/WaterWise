import { useState } from "react";
import { FiSave, FiUserPlus } from "react-icons/fi";

const initialState = {
  accountName: "",
  fullName: "",
  contactNumber: "",
  purok: "",
  email: "",
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-4 focus:ring-sky-100";
const labelClass = "text-sm font-bold text-slate-700";

function ConsumerForm({ onSubmit = () => {} }) {
  const [consumer, setConsumer] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setConsumer((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
  };

  const validate = () => {
    const validationErrors = {};
    if (!consumer.accountName.trim()) validationErrors.accountName = "Account Name is required.";
    if (!consumer.fullName.trim()) validationErrors.fullName = "Full Name is required.";
    if (!consumer.contactNumber.trim()) validationErrors.contactNumber = "Contact Number is required.";
    if (!consumer.purok) validationErrors.purok = "Purok is required.";
    if (!consumer.email.trim()) {
      validationErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(consumer.email)) {
      validationErrors.email = "Invalid email address.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onSubmit(consumer);
    setConsumer(initialState);
    setErrors({});
  };

  const fieldError = (name) =>
    errors[name] ? <p className="mt-1.5 text-xs font-semibold text-red-600" role="alert">{errors[name]}</p> : null;

  return (
    <form className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.07)]" onSubmit={handleSubmit}>
      <div className="border-b border-slate-100 bg-gradient-to-r from-sky-50 to-white px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-200">
            <FiUserPlus className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Register consumer</h2>
            <p className="mt-0.5 text-sm text-slate-500">Add account and contact information.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
        <div>
          <label className={labelClass} htmlFor="accountName">Account Name</label>
          <input className={fieldClass} id="accountName" name="accountName" onChange={handleChange} placeholder="Account Name" type="text" value={consumer.accountName} />
          {fieldError("accountName")}
        </div>
        <div>
          <label className={labelClass} htmlFor="fullName">Full Name</label>
          <input className={fieldClass} id="fullName" name="fullName" onChange={handleChange} placeholder="Full Name" type="text" value={consumer.fullName} />
          {fieldError("fullName")}
        </div>
        <div>
          <label className={labelClass} htmlFor="contactNumber">Contact Number</label>
          <input className={fieldClass} id="contactNumber" name="contactNumber" onChange={handleChange} placeholder="Contact Number" type="text" value={consumer.contactNumber} />
          {fieldError("contactNumber")}
        </div>
        <div>
          <label className={labelClass} htmlFor="purok">Purok</label>
          <select className={fieldClass} id="purok" name="purok" onChange={handleChange} value={consumer.purok}>
            <option value="">Select Purok</option>
            {[1, 2, 3, 4, 5].map((number) => <option key={number} value={`Purok ${number}`}>Purok {number}</option>)}
          </select>
          {fieldError("purok")}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="email">Email Address</label>
          <input className={fieldClass} id="email" name="email" onChange={handleChange} placeholder="Email Address" type="text" value={consumer.email} />
          {fieldError("email")}
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
        <button className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200" type="submit">
          <FiSave className="h-4 w-4" /> Save Consumer
        </button>
      </div>
    </form>
  );
}

export default ConsumerForm;
