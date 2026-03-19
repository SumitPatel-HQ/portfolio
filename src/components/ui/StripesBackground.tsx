import React from "react";
import clsx from "clsx";

interface StripesBackgroundProps {
  className?: string;
  position?: "left" | "right" | "top" | "bottom" | "full";
  width?: string;
  height?: string;
  opacity?: string | number;
}

const StripesBackground: React.FC<StripesBackgroundProps> = ({
  className,
  position = "full",
  width = "100%",
  height = "100%",
  opacity = 0.50,
}) => {
  const resolveSize = (value: string, fallback: string) => {
    if (value === "w-full" || value === "h-full") {
      return "100%";
    }
    return value || fallback;
  };

  const resolveOpacity = (value: string | number) => {
    if (typeof value === "number") {
      return value;
    }

    if (value.startsWith("opacity-")) {
      const numeric = Number(value.replace("opacity-", ""));
      if (!Number.isNaN(numeric)) {
        return Math.max(0, Math.min(1, numeric / 100));
      }
    }

    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
      return Math.max(0, Math.min(1, numeric));
    }

    return 0.3;
  };

  const positionStyles: Record<
    NonNullable<StripesBackgroundProps["position"]>,
    React.CSSProperties
  > = {
    right: { position: "absolute", top: 0, right: 0 },
    left: { position: "absolute", top: 0, left: 0 },
    top: { position: "absolute", top: 0, left: 0, width: "100%", height: "8rem" },
    bottom: { position: "absolute", bottom: 0, left: 0, width: "100%", height: "8rem" },
    full: { position: "absolute", inset: 0 },
  };

  const defaultWidth = position === "top" || position === "bottom" ? "100%" : "100%";
  const defaultHeight = position === "top" || position === "bottom" ? "8rem" : "100%";

  return (
    <div
      aria-hidden="true"
      className={clsx(className)}
      style={{
        pointerEvents: "none",
        zIndex: 1,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.16) 0px, rgba(255, 255, 255, 0.16) 1px, transparent 1px, transparent 10px)",
        opacity: resolveOpacity(opacity),
        width: resolveSize(width, defaultWidth),
        height: resolveSize(height, defaultHeight),
        ...positionStyles[position],
      }}
    />
  );
};

export default StripesBackground;
