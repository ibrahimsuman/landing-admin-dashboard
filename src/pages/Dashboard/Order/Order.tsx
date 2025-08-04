import { useState } from 'react';

const sampleOrders = [
  {
    id: 'ORD001',
    customer: 'John Doe',
    email: 'john@example.com',
    total: 129.99,
    status: 'Pending',
    date: '2025-08-01',
  },
  {
    id: 'ORD002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    total: 59.49,
    status: 'Shipped',
    date: '2025-08-01',
  },
];

const Order = () => {
  const [orders, setOrders] = useState(sampleOrders);

  const handleStatusChange = (id:string, newStatus:string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDelete = (id:string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(prev => prev.filter(order => order.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-xl shadow-sm min-h-[calc(100vh-4rem)]">
      <h2 className="text-xl font-bold mb-4">Manage Orders</h2>
      <div className="-x-auto">
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="text-center">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.customer}</td>
                <td className="p-2 border">{order.email}</td>
                <td className="p-2 border">£{order.total.toFixed(2)}</td>
                <td className="p-2 border">{order.date}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td col-Span="7" className="text-center p-4">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
