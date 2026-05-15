import { Link, NavLink } from "react-router-dom";
import { Fish, ShoppingCart, User } from "lucide-react";
import Container from "./Container";
import Button from "../ui/Button";
import { useAuthStore, type AuthState } from "../../features/auth/authStore";

export default function Navbar() {
  const user = useAuthStore((state: AuthState) => state.user);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/15 text-cyan-300">
            <Fish size={22} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">AquaDynasty</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Premium guppies
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className="text-sm text-slate-300 hover:text-cyan-300">
            Home
          </NavLink>
          <NavLink to="/shop" className="text-sm text-slate-300 hover:text-cyan-300">
            Shop
          </NavLink>
          <NavLink to="/login" className="text-sm text-slate-300 hover:text-cyan-300">
            Login
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/shop"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-cyan-300"
          >
            <ShoppingCart size={18} />
          </Link>

          {user ? (
            <Link
              to="/profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:text-cyan-300"
            >
              <User size={18} />
            </Link>
          ) : (
            <a href="/shop" className="hidden md:inline-flex">
  <Button>Explore Store</Button>
</a>
          )}
        </div>
      </Container>
    </header>
  );
}