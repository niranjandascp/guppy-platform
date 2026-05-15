import Container from "./Container";
import { Fish, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-slate-950 py-20 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px]" />
      
      <Container>
        <div className="grid gap-12 lg:grid-cols-4 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
                <Fish size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">AquaDynasty</span>
            </div>
            <p className="text-slate-400 font-light leading-relaxed max-w-sm">
              The premier destination for high-grade guppy lineages and professional aquatic equipment. Elevating the hobby to an art form.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-light">
              <li><a href="/shop" className="hover:text-cyan-400 transition-colors">Shop All</a></li>
              <li><a href="/gallery" className="hover:text-cyan-400 transition-colors">Showcase</a></li>
              <li><a href="/about" className="hover:text-cyan-400 transition-colors">Lineage Verification</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-cyan-400 hover:text-slate-950 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 pt-10 border-t border-white/5 text-xs text-slate-500 font-light md:flex-row md:items-center md:justify-between">
          <p>© 2026 AquaDynasty. All rights reserved.</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}