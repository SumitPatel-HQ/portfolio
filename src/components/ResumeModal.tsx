"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
        >
          {/* Modal Container Wrapper */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative h-[93vh] w-[92vw] md:w-[65vw] max-w-[1200px]"
          >
            {/* Close button - anchored to modal corner */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume"
              className="absolute -top-3 -right-3 md:-top-5 md:-right-5 rounded-full p-2 bg-background/80 hover:bg-background text-foreground border border-border-custom transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none backdrop-blur-xl z-[10001] shadow-2xl"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>

            <div className="h-full w-full overflow-hidden rounded-lg bg-background-secondary shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
              {/* PDF iframe — fills the entire modal edge-to-edge */}
              <iframe
                src="/Sumit_Resume.pdf"
                title="Resume"
                className="block h-full w-full border-none rounded-[inherit]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
