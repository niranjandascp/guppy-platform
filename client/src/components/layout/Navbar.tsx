import { Link, NavLink } from "react-router-dom";
import { Fish, LayoutDashboard, ShoppingCart, User, Heart } from "lucide-react";
import Container from "./Container";
import Button from "../ui/Button";
import { useAuthStore, type AuthState } from "../../features/auth/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { Search, X, Menu } from "lucide-react";

export default function Navbar() {
  const user = useAuthStore((state: AuthState) => state.user);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-6 left-0 right-0 z-50">
      <Container>
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex h-16 items-center justify-between rounded-full border border-white/10 bg-slate-950/40 px-6 backdrop-blur-xl"
        >
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950">
              <Fish size={20} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white hidden sm:block">Ocean Free Aqua Farm</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {["Home", "Shop", "Gallery", "About"].map((item) => (
              <NavLink 
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={({ isActive }) => `
                  px-4 py-2 text-sm font-medium transition-colors rounded-full
                  ${isActive ? "text-cyan-400 bg-cyan-400/10" : "text-white/60 hover:text-white hover:bg-white/5"}
                `}
              >
                {item}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 240, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative flex items-center"
                >
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search lineage..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 w-full rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-xs text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:outline-none"
                  />
                  <Search size={14} className="absolute left-4 text-white/40" />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-4 text-white/40 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5"
                >
                  <Search size={18} className="text-white/70 hover:text-cyan-400" />
                </motion.button>
              )}
            </AnimatePresence>

            <Link
              to="/wishlist"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-cyan-300"
            >
              <Heart size={18} />
            </Link>

            <Link
              to="/cart"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5"
            >
              <ShoppingCart size={18} className="text-white/70 group-hover:text-cyan-400" />
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                >
                  <User size={18} />
                </Link>
                <div className="hidden md:block">
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button className="h-10 px-6 text-xs uppercase tracking-widest">Login</Button>
              </Link>
            )}
            
            <button className="flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </motion.div>
      </Container>
    </header>
  );
}