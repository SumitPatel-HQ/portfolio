"use client";

import React, { useState } from "react";
import { X, ExternalLink, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown, { capture: true });
      setIsLoading(true);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [isOpen, onClose]);



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4 sm:p-6"
        >
          {/* Modal Container Wrapper */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
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
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/10 transition-all duration-200 hidden sm:block"
                  title="Open in new tab"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
