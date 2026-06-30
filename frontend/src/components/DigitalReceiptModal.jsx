export default function DigitalReceiptModal({ isOpen, receiptData, onClose }) {
  if (!isOpen || !receiptData) return null;

  const calculatedDifference = receiptData.currentReading - receiptData.previousReading;

  return (
    <div data-testid="receipt-modal-overlay">
      <div data-testid="receipt-modal-content">
        <button data-testid="close-modal-btn" onClick={onClose}>Close</button>
        
        <h3>Digital Receipt Preview</h3>
        
        <div>
          <span>Invoice Number:</span>
          <span data-testid="receipt-invoice">{receiptData.invoiceNumber}</span>
        </div>

        <div>
          <span>Name:</span>
          <span data-testid="receipt-name">{receiptData.name}</span>
        </div>

        <div>
          <span>Previous Meter Dial Reading:</span>
          <span data-testid="receipt-prev-dial">{receiptData.previousReading} m³</span>
        </div>

        <div>
          <span>Current Meter Dial Reading:</span>
          <span data-testid="receipt-curr-dial">{receiptData.currentReading} m³</span>
        </div>

        <div>
          <span>Total Consumption Difference:</span>
          <span data-testid="receipt-diff">{calculatedDifference} m³</span>
        </div>

        <div>
          <strong>Total Amount Payable:</strong>
          <span data-testid="receipt-total-payable">
            ₱{receiptData.amountDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}