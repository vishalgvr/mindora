import React from "react";
import { cn } from "@/lib/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-lg gap-1.5",
      md: "text-sm px-4 py-2 rounded-xl gap-2",
      lg: "text-base px-6 py-3 rounded-xl gap-2.5 font-semibold",
      icon: "w-9 h-9 p-0 rounded-xl",
    };

    const variantStyles = {
      primary:
        "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-indigo-500/25",
      gradient:
        "bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white hover:from-indigo-700 hover:via-violet-700 hover:to-purple-700 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30",
      secondary:
        "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
      outline:
        "border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60",
      ghost:
        "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
      danger:
        "bg-rose-500/10 text-rose-600 hover:bg-rose-500/20 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30 border border-rose-200/50 dark:border-rose-900/50",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
