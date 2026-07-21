import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DigitalReceiptModal from '../../components/DigitalReceiptModal';

const sampleReceipt = {
  invoiceNumber: 'INV-2026-XYZ',
  name: 'Jang Wonyoung',
  previousReading: 350,
  currentReading: 378,
  amountDue: 1400.00
};

describe('DigitalReceiptModal', () => {
  it('should render a structured, line-itemed breakdown displaying all required billing metrics and logic calculations', () => {
    render(
      <DigitalReceiptModal 
        isOpen={true} 
        receiptData={sampleReceipt} 
        onClose={() => {}} 
      />
    );

    // Verify raw structure assignments
    expect(screen.getByTestId('receipt-invoice').textContent).toBe('INV-2026-XYZ');
    expect(screen.getByTestId('receipt-name').textContent).toBe('Jang Wonyoung');
    expect(screen.getByTestId('receipt-prev-dial').textContent).toBe('350 m³');
    expect(screen.getByTestId('receipt-curr-dial').textContent).toBe('378 m³');
    
    expect(screen.getByTestId('receipt-diff').textContent).toBe('28 m³');
    
    expect(screen.getByTestId('receipt-total-payable').textContent).toBe('₱1,400.00');
  });

  it('returns null and does not mount or display elements when status flag isOpen is false', () => {
    const { container } = render(
      <DigitalReceiptModal isOpen={false} receiptData={sampleReceipt} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('triggers onClose functional callback correctly when closure element is activated', () => {
    const closeMock = vi.fn();
    render(<DigitalReceiptModal isOpen={true} receiptData={sampleReceipt} onClose={closeMock} />);

    fireEvent.click(screen.getByTestId('close-modal-btn'));
    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});