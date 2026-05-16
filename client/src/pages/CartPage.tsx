import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import CouponBox from "../components/ui/CouponBox";
import { useCartStore } from "../features/cart/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const subtotal = useCartStore((state) => state.subtotal());
  const total = useCartStore((state) => state.total());
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);

  return (
    <div className="bg-slate-950 py-16">
      <Container>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Cart</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Your selection</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-slate-300">Your cart is empty.</p>
            <Link to="/shop" className="mt-5 inline-block">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-28 w-28 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="h-28 w-28 rounded-2xl bg-slate-800" />
                  )}

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-cyan-300">₹{item.price}</p>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                        className="h-9 w-9 rounded-full border border-white/10 text-white"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                        className="h-9 w-9 rounded-full border border-white/10 text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <p className="text-lg font-semibold text-white">
                      ₹{item.price * (item.quantity || 1)}
                    </p>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-5">
              <CouponBox />

              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-semibold text-white">Order summary</h2>

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span>Discount</span>
                    <span>-₹{appliedCoupon?.discountAmount || 0}</span>
                  </div>

                  <div className="border-t border-white/10 pt-3 text-base font-semibold text-white">
                    <div className="flex items-center justify-between">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="mt-5 block">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}