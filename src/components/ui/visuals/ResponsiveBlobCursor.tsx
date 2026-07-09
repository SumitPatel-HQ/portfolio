"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { BlobCursorProps } from "./BlobCursor";

const DynamicBlobCursor = dynamic(
  () => import("./BlobCursor").then((module) => module.BlobCursor),
  { ssr: false },
);

export function ResponsiveBlobCursor(props: BlobCursorProps) {
  const [isDesktopPointer, setIsDesktopPointer] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const updateMatch = () => setIsDesktopPointer(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  return isDesktopPointer ? <DynamicBlobCursor {...props} /> : null;
}
