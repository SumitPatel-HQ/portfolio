"use client";

import { useEffect, useRef } from "react";

import { useLenis } from "@/providers/LenisProvider";

type WheelNavigationOptions = {
  threshold?: number;
  cooldownMs?: number;
  enabled?: boolean;
};

export function useWheelNavigation(
  onNext: () => void,
  onPrev: () => void,
  options: WheelNavigationOptions = {},
) {
  const { isReady } = useLenis();
  const lockRef = useRef(false);
  const cooldownRef = useRef<number | null>(null);
  const accumulatedDeltaRef = useRef(0);

  useEffect(() => {
    const threshold = options.threshold ?? 56;
    const cooldownMs = options.cooldownMs ?? 420;
    const enabled = options.enabled ?? true;

    if (!enabled || !isReady) {
      return;
    }

    const releaseLock = () => {
      lockRef.current = false;
      cooldownRef.current = null;
    };

    const lockWithCooldown = () => {
      lockRef.current = true;
      if (cooldownRef.current !== null) {
        window.clearTimeout(cooldownRef.current);
      }
      cooldownRef.current = window.setTimeout(releaseLock, cooldownMs);
    };

    const onWheel = (event: WheelEvent) => {
      if (lockRef.current) {
        return;
      }

      const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY) * 0.8;
      const delta = horizontalIntent ? event.deltaX : event.deltaY;

      if (Math.abs(delta) < 0.8) {
        return;
      }

      accumulatedDeltaRef.current += delta;

      if (Math.abs(accumulatedDeltaRef.current) < threshold) {
        return;
      }

      if (accumulatedDeltaRef.current > 0) {
        onNext();
      } else {
        onPrev();
      }

      accumulatedDeltaRef.current = 0;
      lockWithCooldown();
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      if (cooldownRef.current !== null) {
        window.clearTimeout(cooldownRef.current);
      }
      cooldownRef.current = null;
      lockRef.current = false;
      accumulatedDeltaRef.current = 0;
    };
  }, [isReady, onNext, onPrev, options.cooldownMs, options.enabled, options.threshold]);
}
