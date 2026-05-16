import { useQuery } from "@tanstack/react-query";
import Container from "../components/layout/Container";
import { getMyOrders } from "../features/orders/orderApi";

export default function MyOrdersPage() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: getMyOrders,
  });

  return (
    <div className="bg-slate-950 py-16">
      <Container>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Orders</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">My orders</h1>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-300">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Shipping</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-slate-400">
                    Loading orders...
                  </td>
                </tr>
              ) : orders.length ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="px-4 py-4">{order._id.slice(-8).toUpperCase()}</td>
                    <td className="px-4 py-4">₹{order.totalPrice}</td>
                    <td className="px-4 py-4">{order.paymentStatus}</td>
                    <td className="px-4 py-4">{order.shippingStatus}</td>
                    <td className="px-4 py-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-slate-400">
                    No orders yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}