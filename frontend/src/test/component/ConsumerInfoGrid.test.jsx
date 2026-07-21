import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ConsumerInfoGrid from '../../components/ConsumerInfoGrid';

describe('ConsumerInfoGrid Component', () => {
  it('should display the consumer’s name, purok, and house number correctly', () => {
    render(<ConsumerInfoGrid name="Iverene Grace" purok="Purok 8" houseNumber="12-B" />);

    expect(screen.getByTestId('info-name').textContent).toBe('Iverene Grace');
    expect(screen.getByTestId('info-purok').textContent).toBe('Purok 8');
    expect(screen.getByTestId('info-house').textContent).toBe('12-B');
  });

  it('should fall back to default labels if data is missing', () => {
    render(<ConsumerInfoGrid />);
    expect(screen.getByTestId('info-name').textContent).toBe('N/A');
  });
});