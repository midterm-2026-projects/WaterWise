import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MonthlyConsumptionWidget from '../../components/MonthlyConsumptionWidget';

describe('MonthlyConsumptionWidget Component', () => {
  it('should render the latest month and volumetric water usage total', () => {
    render(<MonthlyConsumptionWidget month="May 2026" usage={18.9} />);

    expect(screen.getByTestId('consumption-month').textContent).toBe('May 2026');
    expect(screen.getByTestId('consumption-usage').textContent).toBe('18.9 m³');
  });
});