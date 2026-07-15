import { mockOrders } from "@/data/orders-mock";
import { formatPrice } from "@/lib/format";

const STATUS_COLORS = {
  fulfilled: "#0d893e",
  pending: "#e38754",
  refunded: "#9e0011",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Orders</h1>
      <p className="mb-6 text-sm text-neutral-600">
        Placeholder data &mdash; real orders will sync here once the backend and checkout are connected.
      </p>

      <div className="overflow-x-auto border border-border bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-badge-bg">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Date</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((o) => (
              <tr key={o.id} className="border-b border-border last:border-b-0">
                <td className="p-3 font-semibold">{o.id}</td>
                <td className="p-3">{o.customer}</td>
                <td className="p-3 text-neutral-600">{o.date}</td>
                <td className="p-3">{o.items}</td>
                <td className="p-3">{formatPrice(o.total)}</td>
                <td className="p-3">
                  <span className="text-xs font-semibold capitalize" style={{ color: STATUS_COLORS[o.status] }}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
