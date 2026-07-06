import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AnalyticsSummaryGrid from '../components/AnalyticsSummaryGrid';

const mockDataset = [
  { month: 'January 2026', volume: 15 },
  { month: 'February 2026', volume: 32 },
  { month: 'March 2026', volume: 22 },
  { month: 'April 2026', volume: 11 },
];

describe('AnalyticsSummaryGrid', () => {
  it('should parse the telemetry dataset to explicitly compute and display total, average, and peak metrics', () => {
    render(<AnalyticsSummaryGrid consumptionHistory={mockDataset} />);

    expect(screen.getByTestId('stat-total').textContent).toBe('80 m³');

    expect(screen.getByTestId('stat-avg').textContent).toBe('20 m³');

    expect(screen.getByTestId('stat-highest').textContent).toBe('February 2026');
  });

  it('generates empty configurations given zero input contexts', () => {
    render(<AnalyticsSummaryGrid consumptionHistory={[]} />);

    expect(screen.getByTestId('stat-total').textContent).toBe('0 m³');
    expect(screen.getByTestId('stat-avg').textContent).toBe('0 m³');
    expect(screen.getByTestId('stat-highest').textContent).toBe('None');
  });
});