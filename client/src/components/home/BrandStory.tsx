import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function BrandStory() {
  return (
    <section className="mt-16 md:mt-20">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80">Brand Story</p>
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Built for aquarists who care about beauty, lineage, and quality
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            AquaCrest is designed as a premium aquatic marketplace where rare guppy lines,
            visual presentation, and trust-driven product details come together in one elegant experience.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
            Instead of a cluttered catalog, the goal is to create a cinematic storefront with refined
            product storytelling, collector-focused details, and a luxury digital shopping flow.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop">
              <Button>Explore Collection</Button>
            </Link>
            <Link to="/profile">
              <Button variant="secondary">Customer Account</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Premium Focus</p>
            <h3 className="mt-3 text-xl font-semibold text-white">Collector-grade presentation</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Emphasis on visual quality, trust, genetics, and product detail depth.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/60 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Customer Promise</p>
            <h3 className="mt-3 text-xl font-semibold text-white">Clarity before checkout</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Clean pricing, care-related information, and a polished user journey from browse to order.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}