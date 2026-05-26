"use client";

import { useEffect } from "react";
import { useIntro } from "@/context/IntroContext";

/**
 * PageShowHandler — Fix 4 (P1)
 *
 * Mounts once in the root layout (inside <IntroProvider>).
 *
 * When the browser restores a tab from BFCache or after duplication,
 * it fires a `pageshow` event with `event.persisted === true`. React does
 * NOT remount in this scenario, so `useEffect` deps are not re-evaluated.
 *
 * By calling `setIntroComplete(true)` here we force the `isIntroComplete`
 * React state to `true`, which causes `HomeScrollPinController`'s `useEffect`
 * to see a dep change and re-run — rebuilding all ScrollTrigger pin triggers
 * that were orphaned when the tab was cloned.
 *
 * This component has no render output and zero visual cost.
 */
export function PageShowHandler() {
  const { setIntroComplete } = useIntro();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;

      // Force isIntroComplete → true so every useEffect that guards on it
      // (HomeScrollPinController, Menu Lenis restart, etc.) will re-fire.
      // This is idempotent — if it was already true, React bails out of the
      // render because the state value is unchanged.
      setIntroComplete(true);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [setIntroComplete]);

  return null;
}
