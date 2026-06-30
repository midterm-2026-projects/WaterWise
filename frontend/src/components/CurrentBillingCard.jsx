export default function CurrentBillingCard({ outstandingBalance = 0, dueDate = '' }) {
  return (
    <div data-testid="current-billing-card">
      <div>
        <span>Outstanding Balance</span>
        <h2 data-testid="outstanding-balance">
          ₱{outstandingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
      </div>
      <div>
        <span>Upcoming Due Date</span>
        <p data-testid="due-date">{dueDate || 'No pending due date'}</p>
      </div>
    </div>
  );
}