import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "./Button";
import { validateCoupon } from "../../features/admin/couponApi";
import { useCartStore } from "../../features/cart/cartStore";

export default function CouponBox() {
  const [code, setCode] = useState("");
  const subtotal = useCartStore((state) => state.subtotal());
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const applyCoupon = useCartStore((state) => state.applyCoupon);
  const clearCoupon = useCartStore((state) => state.clearCoupon);

  const mutation = useMutation({
    mutationFn: () => validateCoupon(code, subtotal),
    onSuccess: (data) => {
      applyCoupon({
        code: data.code,
        discountAmount: data.discountAmount,
      });
      toast.success("Coupon applied");
    },
    onError: () => toast.error("Invalid coupon"),
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-lg font-semibold text-white">Apply coupon</h3>

      {appliedCoupon ? (
        <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <p className="text-sm text-emerald-300">
            Coupon <span className="font-semibold">{appliedCoupon.code}</span> applied
          </p>
          <p className="mt-1 text-sm text-slate-300">
            Discount: ₹{appliedCoupon.discountAmount}
          </p>
          <button
            onClick={clearCoupon}
            className="mt-3 rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300"
          >
            Remove coupon
          </button>
        </div>
      ) : (
        <div className="mt-4 flex gap-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter coupon code"
            className="h-12 flex-1 rounded-2xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none"
          />
          <Button onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? "Applying..." : "Apply"}
          </Button>
        </div>
      )}
    </div>
  );
}