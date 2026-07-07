import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import NotificationPage from '../components/NotificationPage';

const streamSeeds = [
  {
    id: 'notif-bill-1',
    category: 'bill',
    title: 'Disconnection Warning',
    message: 'Purok 4 Outstanding meter debt balance over 60 days.',
    isRead: false
  },
  {
    id: 'notif-admin-1',
    category: 'announcement',
    title: 'Main Valve Flush Scheduled',
    message: 'Temporary discoloration expected in Brgy. Sucol on Wednesday.',
    isRead: false
  }
];

describe('NotificationPage', () => {
  it('must cleanly separate and render two distinct streams of data into isolated sections', () => {
    render(<NotificationPage notifications={streamSeeds} onMarkAsRead={() => {}} />);

    const billSection = screen.getByTestId('section-bills');
    const announcementSection = screen.getByTestId('section-announcements');

    expect(within(billSection).getByText('Disconnection Warning')).toBeDefined();
    expect(within(billSection).queryByText('Main Valve Flush Scheduled')).toBeNull();

    expect(within(announcementSection).getByText('Main Valve Flush Scheduled')).toBeDefined();
    expect(within(announcementSection).queryByText('Disconnection Warning')).toBeNull();
  });
});