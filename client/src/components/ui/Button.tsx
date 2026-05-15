import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

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
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300",
        variant === "primary" &&
          "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-lg shadow-cyan-500/20",
        variant === "secondary" &&
          "border border-white/15 bg-white/5 text-white hover:bg-white/10",
        variant === "ghost" && "text-white/80 hover:text-cyan-300",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}