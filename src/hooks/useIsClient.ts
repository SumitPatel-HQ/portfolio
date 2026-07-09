"use client";

import { useState, useEffect } from "react";

export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {

    const handle = requestAnimationFrame(() => {
      setIsClient(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return isClient;
}
