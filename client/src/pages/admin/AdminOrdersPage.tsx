import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getAdminOrders,
  updateOrderStatus,
} from "../../features/orders/orderApi";

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAdminOrders,
  });

  const statusMutation = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      toast.success("Order updated");
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
    onError: () => toast.error("Failed to update order"),
  });

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
        Orders
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-white">Manage orders</h1>

      <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-slate-300">
            <tr>
              <th className="px-4 py-3">Order</th>
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
                  <td className="px-4 py-4">
                    <select
                      value={order.paymentStatus}
                      onChange={(e) =>
                        statusMutation.mutate({
                          id: order._id,
                          paymentStatus: e.target.value,
                          shippingStatus: order.shippingStatus,
                        })
                      }
                      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="failed">failed</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={order.shippingStatus}
                      onChange={(e) =>
                        statusMutation.mutate({
                          id: order._id,
                          paymentStatus: order.paymentStatus,
                          shippingStatus: e.target.value,
                        })
                      }
                      className="rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
                    >
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-slate-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}