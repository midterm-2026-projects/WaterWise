import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentBalanceCard from '../../components/CurrentBalanceCard';

describe('CurrentBalanceCard Component', () => {
  it('should display the active amount due', () => {
    render(<CurrentBalanceCard amountDue={2550.50} />);
    
    const balanceElement = screen.getByTestId('balance-amount');
    expect(balanceElement.textContent).toContain('₱2,550.50');
  });

  it('should apply danger/red style classes when active balance due is over zero', () => {
    render(<CurrentBalanceCard amountDue={10} />);
    const balanceElement = screen.getByTestId('balance-amount');
    expect(balanceElement.className).toContain('text-red-600');
  });

  it('should display gray when active balance due is zero', () => {
    render(<CurrentBalanceCard amountDue={0} />);
    const balanceElement = screen.getByTestId('balance-amount');
    expect(balanceElement.className).toContain('text-gray-600');
  });
});