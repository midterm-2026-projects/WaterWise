import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConsumptionTrendGraph from '../components/ConsumptionTrendGraph';

const mockRollingInterval = [
  { month: 'March 2026', volume: 18 },
  { month: 'April 2026', volume: 24 },
  { month: 'May 2026', volume: 29 },
];

describe('ConsumptionTrendGraph', () => {
  it('should render structural timelines mapping chronological x-axis labels and y-axis metrics', () => {
    render(<ConsumptionTrendGraph trendData={mockRollingInterval} />);

    // Verify Y-Axis Tracking Description Rule
    expect(screen.getByTestId('y-axis-labels').textContent).toContain('Volume (m³)');

    // Verify X-Axis Labels match chronological sequence entries
    const monthLabels = screen.getAllByTestId('axis-month-label');
    expect(monthLabels).toHaveLength(3);
    expect(monthLabels[0].textContent).toBe('March 2026');
    expect(monthLabels[1].textContent).toBe('April 2026');
    expect(monthLabels[2].textContent).toBe('May 2026');

    // Verify Data Coordinates are mapped to correct index items in order
    const dataNodes = screen.getAllByTestId('graph-node');
    expect(dataNodes).toHaveLength(3);
    
    expect(dataNodes[0].getAttribute('data-month')).toBe('March 2026');
    expect(dataNodes[0].getAttribute('data-volume')).toBe('18');

    expect(dataNodes[2].getAttribute('data-month')).toBe('May 2026');
    expect(dataNodes[2].getAttribute('data-volume')).toBe('29');
  });
});