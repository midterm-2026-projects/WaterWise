import { useState } from "react";

const initialState = {
  accountName: "",
  fullName: "",
  contactNumber: "",
  purok: "",
  email: "",
};

function ConsumerForm({ onSubmit = () => {} }) {
  const [consumer, setConsumer] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setConsumer((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!consumer.accountName.trim()) {
      validationErrors.accountName = "Account Name is required.";
    }

    if (!consumer.fullName.trim()) {
      validationErrors.fullName = "Full Name is required.";
    }

    if (!consumer.contactNumber.trim()) {
      validationErrors.contactNumber = "Contact Number is required.";
    }

    if (!consumer.purok) {
      validationErrors.purok = "Purok is required.";
    }

    if (!consumer.email.trim()) {
      validationErrors.email = "Email Address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(consumer.email)) {
        validationErrors.email = "Invalid email address.";
      }
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

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Consumer Form</h2>

      <div>
        <label htmlFor="accountName">Account Name</label>

        <input
          id="accountName"
          name="accountName"
          type="text"
          placeholder="Account Name"
          value={consumer.accountName}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.accountName && (
          <p role="alert" className="text-red-500">
            {errors.accountName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="fullName">Full Name</label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={consumer.fullName}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.fullName && (
          <p role="alert" className="text-red-500">
            {errors.fullName}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="contactNumber">Contact Number</label>

        <input
          id="contactNumber"
          name="contactNumber"
          type="text"
          placeholder="Contact Number"
          value={consumer.contactNumber}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.contactNumber && (
          <p role="alert" className="text-red-500">
            {errors.contactNumber}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="purok">Purok</label>

        <select
          id="purok"
          name="purok"
          value={consumer.purok}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select Purok</option>
          <option value="Purok 1">Purok 1</option>
          <option value="Purok 2">Purok 2</option>
          <option value="Purok 3">Purok 3</option>
          <option value="Purok 4">Purok 4</option>
          <option value="Purok 5">Purok 5</option>
        </select>

        {errors.purok && (
          <p role="alert" className="text-red-500">
            {errors.purok}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email">Email Address</label>

        <input
          id="email"
          name="email"
          type="text"
          placeholder="Email Address"
          value={consumer.email}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        {errors.email && (
          <p role="alert" className="text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Save Consumer
      </button>
    </form>
  );
}

export default ConsumerForm;