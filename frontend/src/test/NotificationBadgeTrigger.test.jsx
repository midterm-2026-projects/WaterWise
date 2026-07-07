import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationBadgeTrigger from '../components/NotificationBadgeTrigger';

describe('NotificationBadgeTrigger', () => {
  it('must display a numeric badge over the alert icon that exactly reflects the total count of unread notifications', () => {
    render(<NotificationBadgeTrigger unreadCount={4} onToggleHub={() => {}} />);
    
    const badge = screen.getByTestId('unread-badge');
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe('4');
  });

  it('must hide the numeric badge automatically if the unread count is zero', () => {
    render(<NotificationBadgeTrigger unreadCount={0} onToggleHub={() => {}} />);
    
    const badge = screen.queryByTestId('unread-badge');
    expect(badge).toBeNull();
  });

  it('triggers structural parent open state callback when clicked', () => {
    const toggleSpy = vi.fn();
    render(<NotificationBadgeTrigger unreadCount={1} onToggleHub={toggleSpy} />);
    
    fireEvent.click(screen.getByTestId('notification-trigger'));
    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });
});