import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BillingHistoryTable from '../components/BillingHistoryTable';

const mockHistory = [
  {
    invoiceNumber: 'INV-2026-001',
    billingPeriod: 'April 2026',
    readingDate: '04/25/2026',
    cubicMetersConsumed: 22,
    amountDue: 1100.00,
    status: 'Paid',
    address: 'Purok 2, House #45',
    previousReading: 120,
    currentReading: 142
  },
  {
    invoiceNumber: 'INV-2026-002',
    billingPeriod: 'May 2026',
    readingDate: '05/25/2026',
    cubicMetersConsumed: 18,
    amountDue: 900.00,
    status: 'Overdue',
    address: 'Purok 2, House #45',
    previousReading: 142,
    currentReading: 160
  }
];

describe('BillingHistoryTable', () => {
  it('should render sequential rows mapping the historical dataset, explicitly displaying all requested metrics', () => {
    render(<BillingHistoryTable historyData={mockHistory} onSelectReceipt={() => {}} />);

    const rows = screen.getAllByTestId('history-row');
    expect(rows).toHaveLength(2);

    // Row 1 Assertions
    const months = screen.getAllByTestId('row-month');
    const readingDates = screen.getAllByTestId('row-reading-date');
    const consumptions = screen.getAllByTestId('row-consumption');
    const amounts = screen.getAllByTestId('row-amount-due');
    const statuses = screen.getAllByTestId('row-status');

    expect(months[0].textContent).toBe('April 2026');
    expect(readingDates[0].textContent).toBe('04/25/2026');
    expect(consumptions[0].textContent).toBe('22 m³');
    expect(amounts[0].textContent).toBe('₱1,100.00');
    expect(statuses[0].textContent).toBe('Paid');
    expect(statuses[0].getAttribute('data-status')).toBe('Paid'); 

    expect(months[1].textContent).toBe('May 2026');
    expect(statuses[1].textContent).toBe('Overdue');
    expect(statuses[1].getAttribute('data-status')).toBe('Overdue');
  });

  it('triggers callback with specific row billing data payload when action button is fired', () => {
    const selectMock = vi.fn();
    render(<BillingHistoryTable historyData={mockHistory} onSelectReceipt={selectMock} />);

    // Target specific row execution behavior
    fireEvent.click(screen.getByTestId('view-receipt-INV-2026-001'));
    
    expect(selectMock).toHaveBeenCalledTimes(1);
    expect(selectMock).toHaveBeenCalledWith(mockHistory[0]);
  });

  it("should render an empty billing history table when no records are provided", () => {
  render(
    <BillingHistoryTable
      historyData={[]}
      onSelectReceipt={() => {}}
    />
  );

  expect(
    screen.queryAllByTestId("history-row")
  ).toHaveLength(0);
});
});
