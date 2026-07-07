import NotificationCard from '../components/NotificationCard';

export default function NotificationPage({ notifications = [], onMarkAsRead }) {
  // Clear pipeline splitting by category
  const accountBills = notifications.filter(item => item.category === 'bill');
  const adminAnnouncements = notifications.filter(item => item.category === 'announcement');

  return (
    <div data-testid="notification-hub-page" className="p-6 max-w-4xl mx-auto">
      <h3>Notifications</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Personal Account Bills Section */}
        <section data-testid="section-bills" className="border p-4 rounded-xl">
          <h4 className="border-b pb-2 mb-2 text-blue-600">Account Bills</h4>
          {accountBills.length === 0 ? (
            <p data-testid="empty-bills">No billing notifications.</p>
          ) : (
            accountBills.map(bill => (
              <NotificationCard 
                key={bill.id} 
                item={bill} 
                onMarkAsRead={onMarkAsRead} 
              />
            ))
          )}
        </section>

        {/* Administrative Announcements Section */}
        <section data-testid="section-announcements" className="border p-4 rounded-xl">
          <h4 className="border-b pb-2 mb-2 text-emerald-600">Administrative Announcements</h4>
          {adminAnnouncements.length === 0 ? (
            <p data-testid="empty-announcements">No administrative announcements.</p>
          ) : (
            adminAnnouncements.map(announcement => (
              <NotificationCard 
                key={announcement.id} 
                item={announcement} 
                onMarkAsRead={onMarkAsRead} 
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}