import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import ProductCard from "../components/ui/ProductCard";
import LoadingGrid from "../components/ui/LoadingGrid";
import { getFeaturedProducts } from "../features/products/productApi";

export default function HomePage() {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeaturedProducts,
  });

  return (
    <div className="bg-slate-950">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.16),transparent_25%)]" />
        <Container className="relative grid min-h-[78vh] items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300/80">
              Luxury aquatic marketplace
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Premium guppies for aquarists who care about lineage, beauty, and health.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              A modern storefront for rare guppies, premium care accessories, and trusted aquatic guidance.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/shop">
                <Button>Shop Collection</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary">Create Account</Button>
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl"
          >
            <div className="aspect-[4/5] rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(34,211,238,0.2),rgba(15,23,42,0.3))] p-6">
              <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/10 bg-slate-950/50 p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-cyan-300/80">
                    Signature Drop
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    Blue Moscow Elite
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {["Pure strain", "Active stock", "Video ready"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center text-xs text-slate-300"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Featured guppies"
            title="Handpicked premium stock"
            description="Rare lines, premium care, and elegant presentation — exactly how a startup-grade aquatic marketplace should feel."
          />

          <div className="mt-10">
            {isLoading ? (
              <LoadingGrid />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredProducts?.slice(0, 6).map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}