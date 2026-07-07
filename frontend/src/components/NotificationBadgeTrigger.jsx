export default function NotificationBadgeTrigger({ unreadCount = 0, onToggleHub }) {
  return (
    <button 
      data-testid="notification-trigger" 
      onClick={onToggleHub}
      style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer' }}
    >
      <span data-testid="alert-icon" style={{ fontSize: '24px' }}>🔔</span>
      
      {unreadCount > 0 ? (
        <span 
          data-testid="unread-badge" 
          className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
        >
          {unreadCount}
        </span>
      ) : null}
    </button>
  );
}