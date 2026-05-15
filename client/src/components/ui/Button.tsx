import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden",
        variant === "primary" &&
          "bg-white text-slate-950 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",

        variant === "secondary" &&
          "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40",
        variant === "ghost" && "text-white/60 hover:text-white hover:bg-white/5",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
        />
      )}
    </motion.button>
  );
}