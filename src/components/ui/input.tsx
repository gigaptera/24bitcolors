import * as React from "react";
import { cn } from "@/lib/utils";

import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 font-mono tracking-wide rounded-none",
  {
    variants: {
      variant: {
        default:
          "h-10 border border-neutral-200 focus-visible:ring-1 focus-visible:ring-ring",
        underline:
          "h-12 border-b border-input bg-transparent px-0 border-0 border-b border-neutral-300 dark:border-neutral-700 focus-visible:border-black dark:focus-visible:border-white transition-colors duration-300 placeholder:text-muted-foreground/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
