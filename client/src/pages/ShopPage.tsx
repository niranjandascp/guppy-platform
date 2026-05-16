import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";
import ProductCard from "../components/ui/ProductCard";
import LoadingGrid from "../components/ui/LoadingGrid";
import { getProducts } from "../features/products/productApi";

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page") || "1");

  const { data, isLoading } = useQuery({
    queryKey: ["products", { search, category, sort, page }],
    queryFn: () =>
      getProducts({
        search,
        category,
        sort,
        page,
        limit: 9,
      }),
  });

  const products = data?.products || [];
  const totalPages = data?.pages || 1;

  return (
    <div className="bg-slate-950 py-16">
      <Container>
        <SectionHeading
          eyebrow="Shop"
          title="Browse premium guppy collections"
          description="Search, filter, sort, and paginate products with live backend data."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Filters</h3>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearchParams({
                    search: e.target.value,
                    category,
                    sort,
                    page: "1",
                  })
                }
                placeholder="Search products..."
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none placeholder:text-white/40"
              />

              <select
                value={category}
                onChange={(e) =>
                  setSearchParams({
                    search,
                    category: e.target.value,
                    sort,
                    page: "1",
                  })
                }
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none"
              >
                <option value="">All categories</option>
                <option value="guppies">Guppies</option>
                <option value="rare">Rare</option>
                <option value="accessories">Accessories</option>
              </select>

              <select
                value={sort}
                onChange={(e) =>
                  setSearchParams({
                    search,
                    category,
                    sort: e.target.value,
                    page: "1",
                  })
                }
                className="h-12 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 text-sm text-white outline-none"
              >
                <option value="">Default sort</option>
                <option value="price_asc">Price: Low to high</option>
                <option value="price_desc">Price: High to low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </aside>

          <div>
            {isLoading ? (
              <LoadingGrid />
            ) : products.length ? (
              <>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    disabled={page <= 1}
                    onClick={() =>
                      setSearchParams({
                        search,
                        category,
                        sort,
                        page: String(page - 1),
                      })
                    }
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-slate-400">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page >= totalPages}
                    onClick={() =>
                      setSearchParams({
                        search,
                        category,
                        sort,
                        page: String(page + 1),
                      })
                    }
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-white disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-300">
                No products found.
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}