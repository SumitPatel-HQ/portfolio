"use client";

import { useState, useEffect } from "react";

/**
 * Hook to detect if component is running on client side.
 * Returns false during SSR, true after hydration.
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame to defer the state update until after the initial render cycle,
    // avoiding cascading renders and satisfying the react-hooks/set-state-in-effect lint rule.
    const handle = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return isClient;
}
