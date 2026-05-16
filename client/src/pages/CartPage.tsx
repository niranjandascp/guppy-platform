import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import { useCartStore } from "../features/cart/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const total = useCartStore((state) => state.getTotalPrice());

  return (
    <div className="bg-slate-950 py-16">
      <Container>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Cart</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Your selected fish</h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
                Your cart is empty.
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="h-9 w-9 rounded-full border border-white/10 bg-slate-900 text-white"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-white">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="h-9 w-9 rounded-full border border-white/10 bg-slate-900 text-white"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item._id)}
                      className="ml-3 rounded-full border border-white/10 px-4 py-2 text-xs text-rose-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">Order summary</h2>
            <div className="mt-6 flex items-center justify-between text-slate-300">
              <span>Total</span>
              <span className="text-xl font-semibold text-cyan-300">₹{total}</span>
            </div>

            {items.length > 0 ? (
              <Link to="/checkout" className="mt-6 block">
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
            ) : (
              <Button className="mt-6 w-full" disabled>
                Proceed to Checkout
              </Button>
            )}
          </aside>
        </div>
      </Container>
    </div>
  );
}