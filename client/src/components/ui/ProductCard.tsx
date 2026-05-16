import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import type { Product } from "../../features/products/productApi";
import Button from "./Button";
import { useWishlistStore } from "../../features/wishlist/wishlistStore";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const price =
    product.discountPrice && product.discountPrice > 0
      ? product.discountPrice
      : product.price;

  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const hasItem = useWishlistStore((state) => state.hasItem(product._id));

  const toggleWishlist = () => {
    toggleItem({
      _id: product._id,
      title: product.title,
      slug: product.slug,
      price,
      image: product.images?.[0],
    });

    toast.success(hasItem ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="relative overflow-hidden rounded-[1.25rem] bg-slate-900">
        <button
          type="button"
          onClick={toggleWishlist}
          className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 backdrop-blur-md ${
            hasItem ? "bg-rose-500/20 text-rose-300" : "bg-slate-950/60 text-white"
          }`}
        >
          <Heart size={18} fill={hasItem ? "currentColor" : "none"} />
        </button>

        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.title}
            className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(15,23,42,0.45),rgba(16,185,129,0.12))]" />
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/70">
            {product.category}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{product.title}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {product.breed || "Premium guppy line"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-cyan-300">₹{price}</p>
          {product.discountPrice && product.discountPrice > 0 ? (
            <p className="text-sm text-slate-500 line-through">₹{product.price}</p>
          ) : null}
        </div>
      </div>

      <Link to={`/product/${product.slug}`} className="mt-5 block">
        <Button className="w-full">View Product</Button>
      </Link>
    </div>
  );
}