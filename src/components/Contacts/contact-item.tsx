import React from "react";
import { cn } from "@/lib/utils";

interface ContactItemProps extends React.HTMLAttributes<HTMLElement> {
  icon: React.ElementType;
  label?: string;
  value?: string;
  showText?: boolean;
  iconClassName?: string;
  textClassName?: string;
  href?: string;
}

export const ContactItem = ({
  icon: Icon,
  label,
  value,
  showText = false,
  className,
  iconClassName,
  textClassName,
  href,
  ...props
}: ContactItemProps) => {
  const Component = href ? "a" : "div";

  return (
    <Component
      href={href}
      className={cn(
        "group flex items-center gap-3 transition-all duration-300",
        href ? "cursor-pointer" : "",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300",
          "group-hover:bg-accent group-hover:text-background group-hover:border-accent",
          iconClassName
        )}
      >
        <Icon className="h-5 w-5" />
      </div>
      {showText && (value || label) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-[10px] font-extralight uppercase tracking-tight text-muted-custom">
              {label}
            </span>
          )}
          {value && (
            <span
              className={cn(
                "text-sm font-medium text-foreground transition-all",
                href ? "underline decoration-white/10 decoration-1 underline-offset-4" : "",
                "group-hover:text-accent group-hover:decoration-accent",
                textClassName
              )}
            >
              {value}
            </span>
          )}
        </div>
      )}
    </Component>
  );
};

