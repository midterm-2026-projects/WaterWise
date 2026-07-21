import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfficialReceiptModal from '../../components/OfficialReceiptModal';

const sampleReceipt = {
  meterName: 'Meter-092-Residential',
  runDate: 'June 30, 2026',
  previousReading: 4120,
  presentReading: 4155,
  baselineBill: 650.00,
  arrears30Days: 150.00,
  arrears60Days: 0.00,
  arrears90Days: 300.00,
};

describe('OfficialReceiptModal', () => {
  it('should render the header, metadata, telemetry metrics, itemized arrears matrix, and correct final sum calculations', () => {
    render(<OfficialReceiptModal isOpen={true} receiptData={sampleReceipt} onClose={() => {}} />);

    // Header & Identification validations
    expect(screen.getByText('Sucol Water System Official Receipt')).toBeDefined();
    expect(screen.getByTestId('receipt-meter-name').textContent).toBe('Meter-092-Residential');
    expect(screen.getByTestId('receipt-run-date').textContent).toBe('June 30, 2026');

    // Telemetry and Math validations
    expect(screen.getByTestId('telemetry-prev').textContent).toBe('4120 m³');
    expect(screen.getByTestId('telemetry-pres').textContent).toBe('4155 m³');
    
    // Internal behavioral math check: Present(4155) - Previous(4120) = 35
    expect(screen.getByTestId('telemetry-used').textContent).toBe('35 m³');
    expect(screen.getByTestId('telemetry-baseline').textContent).toBe('₱650.00');

    // Aging Arrears Matrix mappings
    expect(screen.getByTestId('arrears-30').textContent).toContain('₱150.00');
    expect(screen.getByTestId('arrears-60').textContent).toContain('₱0.00');
    expect(screen.getByTestId('arrears-90').textContent).toContain('₱300.00');

    expect(screen.getByTestId('receipt-final-total').textContent).toBe('₱1100.00');
  });

  it('safely handles complete closure behavior when unmounted via isOpen flag', () => {
    const { container } = render(
      <OfficialReceiptModal isOpen={false} receiptData={sampleReceipt} onClose={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });
});
