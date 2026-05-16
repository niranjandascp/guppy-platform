import { Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import { useWishlistStore } from "../features/wishlist/wishlistStore";

export default function WishlistPage() {
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);

  return (
    <div className="bg-slate-950 py-16">
      <Container>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Wishlist</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Saved fish</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-slate-300">Your wishlist is empty.</p>
            <Link to="/shop" className="mt-5 inline-block">
              <Button>Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[4/3] w-full rounded-[1.25rem] object-cover"
                  />
                ) : (
                  <div className="aspect-[4/3] rounded-[1.25rem] bg-slate-800" />
                )}

                <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-cyan-300">₹{item.price}</p>

                <div className="mt-5 flex gap-3">
                  <Link to={`/product/${item.slug}`} className="flex-1">
                    <Button className="w-full">View</Button>
                  </Link>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-rose-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}