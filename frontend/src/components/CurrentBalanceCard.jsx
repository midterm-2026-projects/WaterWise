export default function CurrentBalanceCard({ amountDue = 0 }) {
  const isOverdue = amountDue > 0;
  
  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
          Current Balance
        </h3>
        <p className="text-xs text-gray-500">Outstanding balance totals</p>
      </div>
      <div className="mt-4">
        <span 
          className={`text-3xl font-bold tracking-tight ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}
          data-testid="balance-amount"
        >
          ₱{amountDue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="block text-xs mt-1 text-gray-400">Active Amount Due</span>
      </div>
    </div>
  );
}