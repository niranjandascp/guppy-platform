import { Link, NavLink } from "react-router-dom";
import { Fish, ShoppingCart, User, Menu } from "lucide-react";
import Container from "./Container";
import Button from "../ui/Button";
import { useAuthStore, type AuthState } from "../../features/auth/authStore";
import { motion } from "framer-motion";

export default function Navbar() {
  const user = useAuthStore((state: AuthState) => state.user);

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
            <span className="text-lg font-bold tracking-tight text-white hidden sm:block">AquaDynasty</span>
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
            <Link
              to="/cart"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/5"
            >
              <ShoppingCart size={18} className="text-white/70 group-hover:text-cyan-400" />
            </Link>

            {user ? (
              <Link
                to="/profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              >
                <User size={18} />
              </Link>
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