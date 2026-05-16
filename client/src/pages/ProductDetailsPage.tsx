import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import ReviewForm from "../components/ui/ReviewForm";
import ReviewList from "../components/ui/ReviewList";
import { getProductBySlug } from "../features/products/productApi";
import { useCartStore } from "../features/cart/cartStore";
import { useWishlistStore } from "../features/wishlist/wishlistStore";

export default function ProductDetailsPage() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const toggleItem = useWishlistStore((state) => state.toggleItem);
  const wishlistItems = useWishlistStore((state) => state.items);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="bg-slate-950 py-20">
        <Container>
          <div className="animate-pulse rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="aspect-square rounded-[1.5rem] bg-slate-800" />
              <div className="space-y-4">
                <div className="h-4 w-32 rounded bg-slate-700" />
                <div className="h-10 w-2/3 rounded bg-slate-700" />
                <div className="h-24 rounded bg-slate-800" />
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="bg-slate-950 py-20">
        <Container>
          <div className="rounded-[2rem] border border-rose-500/20 bg-rose-500/5 p-6 text-rose-200">
            Failed to load product details.
          </div>
        </Container>
      </div>
    );
  }

  const displayPrice =
    product.discountPrice && product.discountPrice > 0
      ? product.discountPrice
      : product.price;

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      title: product.title,
      slug: product.slug,
      price: displayPrice,
      image: product.images?.[0],
    });
    toast.success("Added to cart");
  };

  const handleToggleWishlist = () => {
    toggleItem({
      _id: product._id,
      title: product.title,
      slug: product.slug,
      price: displayPrice,
      image: product.images?.[0],
    });
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="bg-slate-950 py-20">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <Link to="/shop" className="text-sm text-cyan-300 hover:text-cyan-200">
            ← Back to shop
          </Link>
          <button
            onClick={handleToggleWishlist}
            className={`flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm ${
              isWishlisted ? "text-rose-300" : "text-white/80"
            }`}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
            {isWishlisted ? "Saved" : "Save"}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="aspect-square w-full rounded-[1.5rem] object-cover"
              />
            ) : (
              <div className="aspect-square rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(15,23,42,0.45),rgba(16,185,129,0.12))]" />
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              {product.category}
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white">{product.title}</h1>
            <p className="mt-3 text-lg leading-8 text-slate-300">{product.description}</p>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-3xl font-semibold text-cyan-300">₹{displayPrice}</span>
              {product.discountPrice && product.discountPrice > 0 ? (
                <span className="text-lg text-slate-500 line-through">₹{product.price}</span>
              ) : null}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Genetics</p>
                <p className="mt-2 text-white">{product.genetics || "N/A"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Tank size</p>
                <p className="mt-2 text-white">{product.tankSize || "N/A"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Lifespan</p>
                <p className="mt-2 text-white">{product.lifespan || "N/A"}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Stock</p>
                <p className="mt-2 text-white">{product.stock}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button className="w-full" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => {
                  handleAddToCart();
                  navigate("/checkout");
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <ReviewList productId={product._id} />
          <ReviewForm productId={product._id} />
        </div>
      </Container>
    </div>
  );
}