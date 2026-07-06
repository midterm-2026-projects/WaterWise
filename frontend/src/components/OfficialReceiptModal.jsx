export default function OfficialReceiptModal({ isOpen, receiptData, onClose }) {
  if (!isOpen || !receiptData) return null;

  const {
    meterName,
    runDate,
    previousReading,
    presentReading,
    baselineBill,
    arrears30Days = 0,
    arrears60Days = 0,
    arrears90Days = 0,
  } = receiptData;

  // Behavioral logic calculation steps
  const cubicMetersUsed = presentReading - previousReading;
  const totalArrears = arrears30Days + arrears60Days + arrears90Days;
  const finalTotalBill = baselineBill + totalArrears;

  return (
    <div data-testid="receipt-modal">
      <button data-testid="close-modal" onClick={onClose}>Close</button>
      
      {/* Required Headers */}
      <h1>Sucol Water System Official Receipt</h1>
      <div data-testid="receipt-meter-name">{meterName}</div>
      <div data-testid="receipt-run-date">{runDate}</div>

      {/* Telemetry Matrix Grid */}
      <table>
        <tbody>
          <tr>
            <td>Previous Reading:</td>
            <td data-testid="telemetry-prev">{previousReading} m³</td>
          </tr>
          <tr>
            <td>Present Reading:</td>
            <td data-testid="telemetry-pres">{presentReading} m³</td>
          </tr>
          <tr>
            <td>Cubic Meters Used:</td>
            <td data-testid="telemetry-used">{cubicMetersUsed} m³</td>
          </tr>
          <tr>
            <td>Baseline Water Bill:</td>
            <td data-testid="telemetry-baseline">₱{baselineBill.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* Itemized Arrears Aging Grid */}
      <div data-testid="arrears-matrix">
        <span data-testid="arrears-30">Over 30 Days: ₱{arrears30Days.toFixed(2)}</span>
        <span data-testid="arrears-60">Over 60 Days: ₱{arrears60Days.toFixed(2)}</span>
        <span data-testid="arrears-90">Over 90 Days: ₱{arrears90Days.toFixed(2)}</span>
      </div>

      {/* Calculation Output Context */}
      <div>
        <strong>Total Bill Sum:</strong>
        <span data-testid="receipt-final-total">₱{finalTotalBill.toFixed(2)}</span>
      </div>
    </div>
  );
}