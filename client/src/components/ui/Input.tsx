import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/40 focus:border-cyan-400",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;