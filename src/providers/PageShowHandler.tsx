"use client";

import { useEffect } from "react";
import { useIntro } from "@/context/IntroContext";


export function PageShowHandler() {
  const { setIntroComplete } = useIntro();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      setIntroComplete(true);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [setIntroComplete]);

  return null;
}
