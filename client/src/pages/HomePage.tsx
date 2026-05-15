import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";

const featured = [
  {
    name: "Blue Moscow Guppy",
    price: "₹499",
    tag: "Rare line",
  },
  {
    name: "Red Dragon Pair",
    price: "₹899",
    tag: "Collector grade",
  },
  {
    name: "Platinum Dumbo",
    price: "₹749",
    tag: "Premium fins",
  },
];

export default function HomePage() {
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
              <Link to="/login">
                <Button variant="secondary">Customer Login</Button>
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
            description="Start with a polished product showcase while the backend product API is getting wired up."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((item) => (
              <div
                key={item.name}
                className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="mb-5 aspect-[4/3] rounded-[1.25rem] bg-[linear-gradient(135deg,rgba(34,211,238,0.2),rgba(15,23,42,0.35),rgba(16,185,129,0.2))]" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.tag}</p>
                  </div>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
                    {item.price}
                  </span>
                </div>
                <Button className="mt-6 w-full">View Details</Button>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}