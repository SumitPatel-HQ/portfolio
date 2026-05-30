"use client";

import React, { forwardRef } from "react";

/**
 * BrandLayer — The atmospheric middle scene of the vertical transition stack.
 *
 * Renders a full-viewport panel with the portfolio owner's name in large,
 * semi-transparent typography and a subtle accent glow.
 */
interface BrandLayerProps {
  pageName?: string;
}

const BrandLayer = forwardRef<HTMLDivElement, BrandLayerProps>(function BrandLayer(
  { pageName = "SUMIT" },
  ref
) {
  return (
    <div ref={ref} className="transition-brand-layer" aria-hidden="true">
      <div className="transition-brand-inner">
        <span className="transition-brand-text">{pageName}</span>
      </div>
    </div>
  );
});

export { BrandLayer };
