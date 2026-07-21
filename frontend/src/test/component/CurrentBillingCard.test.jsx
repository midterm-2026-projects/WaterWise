import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentBillingCard from '../../components/CurrentBillingCard';

describe('CurrentBillingCard', () => {
  it('should display the current outstanding balance and upcoming due date prominently in the statement card', () => {
    const testProps = {
      outstandingBalance: 1850.50,
      dueDate: 'July 15, 2026'
    };

    render(<CurrentBillingCard {...testProps} />);

    expect(screen.getByTestId('outstanding-balance').textContent).toBe('₱1,850.50');
    expect(screen.getByTestId('due-date').textContent).toBe('July 15, 2026');
  });

  it('handles fallback states safely when values are missing', () => {
    render(<CurrentBillingCard outstandingBalance={0} dueDate="" />);

    expect(screen.getByTestId('outstanding-balance').textContent).toBe('₱0.00');
    expect(screen.getByTestId('due-date').textContent).toBe('No pending due date');
  });
});