import { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("orders/")
      .then((res) => {
        setOrders(res.data.results || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status) => {
    const styles = {
      completed: "badge badge-success",
      processing: "badge badge-warning",
      shipped: "badge badge-info",
      pending: "badge badge-ghost",
      cancelled: "badge badge-error",
    };
    return styles[status?.toLowerCase()] || "badge";
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <p className="mt-6 text-center">Loading orders...</p>;

  return (
    <div className="mt-6 card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center">No orders found</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>#ORD-{String(order.id).slice(0, 4).toUpperCase()}</td>
                    <td>{order.customer_name || order.user?.email || "N/A"}</td>
                    <td>
                      <div className={getStatusBadge(order.status)}>
                        {order.status}
                      </div>
                    </td>
                    <td>{formatDate(order.created_at || order.date)}</td>
                    <td>${parseFloat(order.total_price || order.amount || 0).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;