export default function NotificationCard({ item, onMarkAsRead }) {
  if (!item) return null;

  return (
    <div
      data-testid={`notification-card-${item.id}`}
      data-id={item.id}
      data-is-read={item.isRead}
      
      className={`p-4 mb-3 rounded-lg cursor-pointer transition-colors ${
        item.isRead ? 'bg-neutral text-gray-500' : 'bg-unread-highlight text-gray-950 font-semibold'
      }`}
      onClick={() => !item.isRead && onMarkAsRead && onMarkAsRead(item.id)}
    >
      <h5>{item.title}</h5>
      <p className="text-sm font-normal">{item.message}</p>
    </div>
  );
}