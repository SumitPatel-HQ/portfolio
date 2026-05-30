// BrandLayer — The atmospheric middle scene of the vertical transition stack.

"use client";

import React, { forwardRef } from "react";

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
