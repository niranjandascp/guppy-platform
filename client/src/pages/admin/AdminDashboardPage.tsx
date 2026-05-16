import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IndianRupee, ShoppingCart, Users, Package } from "lucide-react";
import { getDashboardAnalytics } from "../../features/admin/analyticsApi";

const statCards = [
  { key: "revenue", label: "Revenue", icon: IndianRupee, color: "text-cyan-300" },
  { key: "orders", label: "Orders", icon: ShoppingCart, color: "text-emerald-300" },
  { key: "users", label: "Users", icon: Users, color: "text-violet-300" },
  { key: "products", label: "Products", icon: Package, color: "text-amber-300" },
] as const;

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: getDashboardAnalytics,
    refetchInterval: 30000,
  });

  const summary = data?.summary;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Overview</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Admin dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = summary?.[card.key] ?? 0;

          return (
            <div
              key={card.key}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400">{card.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {card.key === "revenue" ? `₹${value}` : value}
                  </p>
                </div>
                <div className={`rounded-2xl bg-white/5 p-3 ${card.color}`}>
                  <Icon size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
          Loading analytics...
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h2 className="mb-5 text-lg font-semibold text-white">Revenue trend</h2>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.revenueChart || []}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#22d3ee" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h2 className="mb-5 text-lg font-semibold text-white">Orders trend</h2>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.ordersChart || []}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <h2 className="mb-5 text-lg font-semibold text-white">Top products</h2>
        <div className="space-y-3">
          {data?.topProducts?.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <span className="text-white">{item.title}</span>
              <span className="text-cyan-300">{item.sales} sold</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}