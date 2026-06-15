import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 md:h-16 lg:h-12 w-full rounded-lg border border-border-custom bg-background-dark px-4 md:px-4 lg:px-3 py-3 lg:py-2 text-base md:text-lg lg:text-sm text-foreground file:border-0 file:bg-transparent file:text-base md:file:text-lg lg:file:text-sm file:font-medium file:text-foreground placeholder:text-muted-custom focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 hover:border-accent/40",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
