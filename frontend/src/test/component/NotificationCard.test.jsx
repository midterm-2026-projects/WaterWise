import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationCard from '../../components/NotificationCard';

describe('NotificationCard', () => {
  const unreadItem = {
    id: 'n-1',
    title: 'Water Bill Overdue',
    message: 'Your current balance due is ₱1,450.75.',
    isRead: false
  };

  const readItem = {
    id: 'n-2',
    title: 'System Patch Installed',
    message: 'The billing ledger engine has updated.',
    isRead: true
  };

  it('shifts background color state configurations based on the unread vs read metadata status flag', () => {
    const { rerender } = render(<NotificationCard item={unreadItem} onMarkAsRead={() => {}} />);
    
    let card = screen.getByTestId('notification-card-n-1');
    expect(card.getAttribute('data-is-read')).toBe('false');
    expect(card.className).toContain('bg-sky-50');

    rerender(<NotificationCard item={readItem} onMarkAsRead={() => {}} />);
    
    card = screen.getByTestId('notification-card-n-2');
    expect(card.getAttribute('data-is-read')).toBe('true');
    expect(card.className).toContain('bg-slate-50');
  });

  it('triggers state mutation event callback with the target item ID when clicked in an unread condition', () => {
    const markMock = vi.fn();
    render(<NotificationCard item={unreadItem} onMarkAsRead={markMock} />);

    fireEvent.click(screen.getByTestId('notification-card-n-1'));
    
    expect(markMock).toHaveBeenCalledTimes(1);
    expect(markMock).toHaveBeenCalledWith('n-1');
  });

  it('intercepts and aborts state change action handlers if the notification layout is already flagged read', () => {
    const markMock = vi.fn();
    render(<NotificationCard item={readItem} onMarkAsRead={markMock} />);

    fireEvent.click(screen.getByTestId('notification-card-n-2'));
    
    expect(markMock).not.toHaveBeenCalled();
  });

  it('deletes a notification without opening or marking it as read', () => {
    const deleteMock = vi.fn();
    const markMock = vi.fn();
    const clickMock = vi.fn();
    render(
      <NotificationCard
        item={unreadItem}
        onDelete={deleteMock}
        onMarkAsRead={markMock}
        onNotificationClick={clickMock}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete Water Bill Overdue' }));

    expect(deleteMock).toHaveBeenCalledWith('n-1');
    expect(markMock).not.toHaveBeenCalled();
    expect(clickMock).not.toHaveBeenCalled();
  });
});
