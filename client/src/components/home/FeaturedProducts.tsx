import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import ProductCard from "../ui/ProductCard";
import Button from "../ui/Button";
import { getFeaturedProducts } from "../../features/products/productApi";

export default function FeaturedProducts() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts,
  });

  return (
    <section className="mt-16 md:mt-20">
      <SectionHeading
        eyebrow="Featured Collection"
        title="Curated premium guppies"
        description="Handpicked premium lines selected for visual elegance, strong genetics, and collector appeal."
      />

      {isLoading ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
            >
              <div className="aspect-[4/3] rounded-[1.25rem] bg-slate-800" />
              <div className="mt-4 h-4 w-24 rounded bg-slate-700" />
              <div className="mt-3 h-6 w-2/3 rounded bg-slate-700" />
              <div className="mt-2 h-4 w-1/2 rounded bg-slate-800" />
            </div>
          ))}
        </div>
      ) : products.length ? (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="mt-8">
            <Link to="/shop">
              <Button>View All Products</Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
          No featured products available yet.
        </div>
      )}
    </section>
  );
}