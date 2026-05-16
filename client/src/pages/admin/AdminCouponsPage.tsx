import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  updateCoupon,
  type Coupon,
  type CouponPayload,
} from "../../features/admin/couponApi";

const emptyForm: CouponPayload = {
  code: "",
  discountType: "percentage",
  discountValue: 0,
  minOrderAmount: 0,
  expiresAt: "",
  isActive: true,
};

export default function AdminCouponsPage() {
  const queryClient = useQueryClient();
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState<CouponPayload>(emptyForm);

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["admin-coupons"],
    queryFn: getCoupons,
  });

  const refreshCoupons = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
  };

  const createMutation = useMutation({
    mutationFn: createCoupon,
    onSuccess: () => {
      toast.success("Coupon created");
      setFormData(emptyForm);
      refreshCoupons();
    },
    onError: () => toast.error("Failed to create coupon"),
  });

  const updateMutation = useMutation({
    mutationFn: updateCoupon,
    onSuccess: () => {
      toast.success("Coupon updated");
      setEditingCoupon(null);
      setFormData(emptyForm);
      refreshCoupons();
    },
    onError: () => toast.error("Failed to update coupon"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: () => {
      toast.success("Coupon deleted");
      refreshCoupons();
    },
    onError: () => toast.error("Failed to delete coupon"),
  });

  const isEditing = useMemo(() => !!editingCoupon, [editingCoupon]);

  const handleSubmit = () => {
    if (isEditing && editingCoupon) {
      updateMutation.mutate({ id: editingCoupon._id, payload: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Coupons</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Manage coupons</h1>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            placeholder="Coupon code"
            value={formData.code}
            onChange={(e) => setFormData((prev) => ({ ...prev, code: e.target.value }))}
          />

          <select
            value={formData.discountType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                discountType: e.target.value as "percentage" | "fixed",
              }))
            }
            className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none"
          >
            <option value="percentage">percentage</option>
            <option value="fixed">fixed</option>
          </select>

          <Input
            type="number"
            placeholder="Discount value"
            value={formData.discountValue}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, discountValue: Number(e.target.value) }))
            }
          />

          <Input
            type="number"
            placeholder="Minimum order amount"
            value={formData.minOrderAmount}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, minOrderAmount: Number(e.target.value) }))
            }
          />

          <Input
            type="date"
            value={formData.expiresAt}
            onChange={(e) => setFormData((prev) => ({ ...prev, expiresAt: e.target.value }))}
          />

          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
              }
            />
            Active
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <Button onClick={handleSubmit}>
            {isEditing ? "Update Coupon" : "Create Coupon"}
          </Button>

          {isEditing && (
            <Button
              variant="secondary"
              onClick={() => {
                setEditingCoupon(null);
                setFormData(emptyForm);
              }}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-slate-300">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Value</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 text-slate-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-slate-400">
                  Loading coupons...
                </td>
              </tr>
            ) : coupons.length ? (
              coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td className="px-4 py-4">{coupon.code}</td>
                  <td className="px-4 py-4">{coupon.discountType}</td>
                  <td className="px-4 py-4">{coupon.discountValue}</td>
                  <td className="px-4 py-4">{coupon.isActive ? "Yes" : "No"}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingCoupon(coupon);
                          setFormData({
                            code: coupon.code,
                            discountType: coupon.discountType,
                            discountValue: coupon.discountValue,
                            minOrderAmount: coupon.minOrderAmount || 0,
                            expiresAt: coupon.expiresAt?.slice(0, 10) || "",
                            isActive: coupon.isActive,
                          });
                        }}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-cyan-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteMutation.mutate(coupon._id)}
                        className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-slate-400">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}