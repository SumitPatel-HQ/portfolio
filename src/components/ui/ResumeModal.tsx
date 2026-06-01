"use client";

import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { X, Loader2, Download, ExternalLink } from "lucide-react";
import gsap from "gsap";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  const handleDownload = async () => {
    try {
      const response = await fetch("/Sumit_Resume.pdf");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Sumit_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // fallback: navigate directly
      window.open("/Sumit_Resume.pdf", "_blank");
    }
  };

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setShouldRender(true);
      setIsAnimatingOut(false);
      setIsLoading(true);
    } else if (shouldRender) {
      setIsAnimatingOut(true);
    }
  }

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown, { capture: true });
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isAnimatingOut) {
      const tl = gsap.timeline({
        onComplete: () => {
          setShouldRender(false);
          setIsAnimatingOut(false);
        },
      });

      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          { opacity: 0, backdropFilter: "blur(0px)", duration: 0.3, ease: "power2.inOut" },
          0
        );
      }
      if (contentRef.current) {
        tl.to(
          contentRef.current,
          { opacity: 0, y: 60, duration: 0.2, ease: "power3.in" },
          0
        );
      }

      return () => {
        tl.kill();
      };
    }
  }, [isAnimatingOut]);

  useLayoutEffect(() => {
    if (shouldRender && !isAnimatingOut) {
      const tl = gsap.timeline();

      if (overlayRef.current) {
        gsap.set(overlayRef.current, { opacity: 0, backdropFilter: "blur(0px)" });
        tl.to(
          overlayRef.current,
          { opacity: 1, backdropFilter: "blur(8px)", duration: 0.4, ease: "power2.out" },
          0
        );
      }

      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 1, y: "100vh" });
        tl.to(
          contentRef.current,
          { y: 0, duration: 0.7, ease: "power4.out" },
          0
        );
      }

      return () => {
        tl.kill();
      };
    }
  }, [shouldRender, isAnimatingOut]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 sm:p-6"
    >
      {/* Modal Container Wrapper */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col h-[93vh] w-[92vw] md:w-[65vw] max-w-[1200px] overflow-hidden rounded-xl bg-background border border-border-custom shadow-[0_0_80px_rgba(0,0,0,0.6)]"
      >
        {/* Custom Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-background-secondary/80 backdrop-blur-md border-b border-border-custom z-20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center border border-border-custom shadow-sm">
              <span className="text-foreground text-xs text-center font-bold tracking-wider">SP</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-foreground leading-tight tracking-wide">Resume.pdf</h3>
              <p className="text-xs text-muted-foreground">Document</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <a
              href="/Sumit_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-200 group"
              title="Open in new tab"
            >
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            </a>

             <div className="w-px h-6 bg-border-custom mx-1"></div>

            <button
              onClick={handleDownload}
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-200 group"
              title="Download Resume"
            >
              <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            </button>

            <div className="w-px h-6 bg-border-custom mx-1"></div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 group"
              title="Close"
            >
              <X className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="relative flex-1 w-full bg-[#1e1e1e]">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background z-0">
              <Loader2 className="h-8 w-8 animate-spin text-foreground/50 mb-4" />
              <p className="text-sm text-muted-foreground animate-pulse font-medium tracking-wide">Loading Document...</p>
            </div>
          )}

          <iframe
            src="/Sumit_Resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
            title="Resume"
            onLoad={() => setIsLoading(false)}
            className={`relative z-10 block h-full w-full border-none transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>
      </div>
    </div>
  );
};
