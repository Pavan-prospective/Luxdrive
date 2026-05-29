"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary text-white hover:bg-black/90 shadow-md active:scale-[0.98]",
      secondary: "bg-secondary text-primary hover:bg-secondary/80 active:scale-[0.98]",
      accent: "bg-accent text-white hover:bg-accent/90 shadow-lg active:scale-[0.98]",
      outline: "border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-white active:scale-[0.98]",
      ghost: "bg-transparent text-primary hover:bg-secondary active:scale-[0.98]",
      link: "bg-transparent text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm rounded-lg",
      md: "h-12 px-6 text-base rounded-xl",
      lg: "h-14 px-8 text-lg font-semibold rounded-2xl",
      icon: "h-10 w-10 flex items-center justify-center rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
