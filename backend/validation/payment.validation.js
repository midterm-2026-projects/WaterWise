export function validatePayment(payment) {
  const errors = {};

  if (
    !payment.invoiceNumber ||
    !payment.invoiceNumber.trim()
  ) {
    errors.invoiceNumber =
      "Invoice Number is required.";
  }

  if (
    !payment.consumerName ||
    !payment.consumerName.trim()
  ) {
    errors.consumerName =
      "Consumer Name is required.";
  }

  if (!payment.paymentDate) {
    errors.paymentDate =
      "Payment Date is required.";
  }

  if (
    !payment.paymentMethod ||
    !payment.paymentMethod.trim()
  ) {
    errors.paymentMethod =
      "Payment Method is required.";
  }

  if (
    payment.amountPaid === undefined ||
    payment.amountPaid === null ||
    payment.amountPaid === ""
  ) {
    errors.amountPaid =
      "Amount Paid is required.";
  } else if (
    Number(payment.amountPaid) <= 0
  ) {
    errors.amountPaid =
      "Amount Paid must be greater than zero.";
  }

  return {
    valid:
      Object.keys(errors).length === 0,
    errors,
  };
}