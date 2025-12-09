import * as React from "react";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      type="range"
      className={cn(
        "w-full h-2 bg-neutral-200 rounded-none appearance-none cursor-pointer accent-neutral-900 dark:accent-neutral-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Slider.displayName = "Slider";

export { Slider };
