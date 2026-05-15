import Container from "../components/layout/Container";
import SectionHeading from "../components/ui/SectionHeading";

export default function ShopPage() {
  return (
    <div className="bg-slate-950 py-16">
      <Container>
        <SectionHeading
          eyebrow="Shop"
          title="Browse premium guppy collections"
          description="Next step: connect this page to your products API with React Query, filters, and pagination."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold text-white">Filters</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">
                Category
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">
                Breed
              </div>
              <div className="rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3">
                Price
              </div>
            </div>
          </aside>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5"
              >
                <div className="aspect-[4/3] rounded-[1.25rem] bg-slate-800" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Product {index + 1}
                </h3>
                <p className="mt-1 text-sm text-slate-400">Premium guppy line</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}