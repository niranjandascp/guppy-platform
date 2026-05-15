import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 glass-panel border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-aqua to-emerald bg-clip-text text-transparent tracking-tight">
              AquaDynasty
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link to="/shop" className="hover:text-aqua transition-colors">Shop</Link>
            <Link to="/categories" className="hover:text-aqua transition-colors">Categories</Link>
            <Link to="/care-guide" className="hover:text-aqua transition-colors">Care Guide</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5 text-slate-300">
            <button className="hover:text-aqua transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <Link to="/cart" className="hover:text-aqua transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-aqua text-ocean text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/profile" className="hover:text-aqua transition-colors hidden sm:block">
              <User size={20} />
            </Link>
            <button className="md:hidden hover:text-aqua transition-colors">
              <Menu size={24} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}