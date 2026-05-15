import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { Fish, Shield, Zap, Sparkles, ArrowRight } from "lucide-react";

const featured = [
  {
    name: "Blue Moscow Guppy",
    price: "₹499",
    tag: "Signature Strain",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    name: "Red Dragon Pair",
    price: "₹899",
    tag: "Collector Grade",
    gradient: "from-rose-500/20 to-orange-500/20",
  },
  {
    name: "Platinum Dumbo",
    price: "₹749",
    tag: "Premium Fins",
    gradient: "from-indigo-500/20 to-cyan-500/20",
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yFish = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-fuchsia-500/5 rounded-full blur-[100px]" />
        </div>

        <Container className="relative z-10 grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            style={{ opacity: opacityHero, scale: scaleHero }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-6"
            >
              <Sparkles size={12} />
              <span>2025 Collector's Edition</span>
            </motion.div>
            
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.1] text-gradient mb-8">
              The Art of <br />
              <span className="text-cyan-gradient">Aquatic</span> Life.
            </h1>
            
            <p className="text-xl text-slate-400 font-light max-w-lg mb-10 leading-relaxed">
              Experience the world's most exquisite guppy lineages, bred for perfection and curated for the modern aquarist.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link to="/shop">
                <Button className="h-14 px-8 text-sm uppercase tracking-widest shadow-2xl shadow-cyan-500/40">
                  Explore Collection
                </Button>
              </Link>
              <Link to="/about" className="group flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition-colors">
                Learn our Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            style={{ y: yFish, opacity: opacityHero }}
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 animate-float">
              <img 
                src="/assets/hero-fish.png" 
                alt="Blue Moscow Guppy" 
                className="w-full max-w-[600px] mx-auto drop-shadow-[0_0_80px_rgba(34,211,238,0.3)]"
              />
            </div>
            
            {/* Interactive Stats Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4 w-full max-w-sm"
            >
              {[
                { label: "Purity", val: "99.8%" },
                { label: "Vitality", val: "Elite" },
                { label: "Stock", val: "Limited" }
              ].map((stat, i) => (
                <div key={i} className="flex-1 glass rounded-2xl p-4 text-center">
                  <p className="text-[10px] uppercase tracking-tighter text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-sm font-bold text-white">{stat.val}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Featured Section */}
      <section className="relative py-32 overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeading
              align="center"
              eyebrow="Curated Excellence"
              title="Signature Bloodlines"
              description="A glimpse into our current most sought-after aquatic masterpieces."
            />
          </motion.div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="glass-card rounded-[2.5rem] p-6 h-full flex flex-col">
                  <div className={`mb-8 aspect-square rounded-[2rem] bg-gradient-to-br ${item.gradient} flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-700`}>
                    <Fish size={80} className="text-white/20 group-hover:text-cyan-400/40 transition-colors duration-700" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400/80">{item.tag}</span>
                      <span className="text-lg font-bold text-white">{item.price}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{item.name}</h3>
                  </div>

                  <Button variant="secondary" className="w-full h-12 rounded-2xl group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all duration-500">
                    View Specs
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              { 
                icon: <Shield className="text-cyan-400" />, 
                title: "Certified Pedigree", 
                desc: "Every pair comes with a documented lineage and health certification." 
              },
              { 
                icon: <Zap className="text-fuchsia-500" />, 
                title: "Bio-Secure Shipping", 
                desc: "Our proprietary 48-hour climate-controlled transit ensures zero stress." 
              },
              { 
                icon: <Sparkles className="text-amber-400" />, 
                title: "Expert Support", 
                desc: "Lifetime guidance from master breeders to ensure your colony thrives." 
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-8 rounded-[2rem] border border-white/[0.03] hover:bg-white/[0.02] transition-colors"
              >
                <div className="mb-6 p-4 rounded-2xl bg-white/5">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Footer-like CTA */}
      <section className="py-32">
        <Container>
          <div className="relative glass rounded-[3rem] p-12 lg:p-24 overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Ready to Elevate <br /> Your Aquarium?</h2>
              <Link to="/register">
                <Button className="h-16 px-12 text-sm uppercase tracking-widest">Join the Dynasty</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}