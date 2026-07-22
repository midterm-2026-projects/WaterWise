function ConsumerListTable({
  consumers = [],
  onView = () => {},
  onEdit = () => {},
}) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full border border-gray-300 bg-white">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="border p-3">Account Name</th>
            <th className="border p-3">Full Name</th>
            <th className="border p-3">Contact Number</th>
            <th className="border p-3">Purok</th>
            <th className="border p-3">Email Address</th>
            <th className="border p-3">Payment Status</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {consumers.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="text-center p-6"
              >
                No consumers found.
              </td>
            </tr>
          ) : (
            consumers.map((consumer) => (
              <tr key={consumer.id}>
                <td className="border p-3">
                  {consumer.accountName}
                </td>

                <td className="border p-3">
                  {consumer.fullName}
                </td>

                <td className="border p-3">
                  {consumer.contactNumber}
                </td>

                <td className="border p-3">
                  {consumer.purok}
                </td>

                <td className="border p-3">
                  {consumer.email}
                </td>

                <td className="border p-3">
                  {consumer.paymentStatus}
                </td>

                <td className="border p-3 space-x-2">
                  <button
                    onClick={() => onView(consumer)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(consumer)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ConsumerListTable;