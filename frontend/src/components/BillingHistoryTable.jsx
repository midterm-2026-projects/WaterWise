export default function BillingHistoryTable({ historyData = [], onSelectReceipt }) {
  return (
    <table data-testid="billing-history-table">
      <thead>
        <tr>
          <th>Billing Period</th>
          <th>Reading Date</th>
          <th>Consumption</th>
          <th>Amount Due</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((row) => (
          <tr key={row.invoiceNumber} data-testid="history-row">
            <td data-testid="row-month">{row.billingPeriod}</td>
            <td data-testid="row-reading-date">{row.readingDate}</td>
            <td data-testid="row-consumption">{row.cubicMetersConsumed} m³</td>
            <td data-testid="row-amount-due">
              ₱{row.amountDue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </td>
            <td>
              <span data-testid="row-status" data-status={row.status}>
                {row.status}
              </span>
            </td>
            <td>
              <button 
                data-testid={`view-receipt-${row.invoiceNumber}`}
                onClick={() => onSelectReceipt && onSelectReceipt(row)}
              >
                View Receipt
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}