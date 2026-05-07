"use client";
import React, { useState, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheck, AlertCircle } from "lucide-react";

type ToastType = "success" | "error";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastContainerProps {
  toasts: Toast[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-5 z-50 flex flex-col gap-3 sm:inset-x-auto sm:right-8 sm:bottom-8 sm:w-[min(420px,calc(100vw-4rem))]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto"
          >
            <ToastComponent {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const ToastComponent: React.FC<Toast> = ({ message, type }) => {
  const typeConfig = {
    success: {
      icon: CircleCheck,
      label: "Sent",
      accent: "bg-accent",
      iconColor: "text-accent",
      iconSurface: "bg-accent-faded",
    },
    error: {
      icon: AlertCircle,
      label: "Failed",
      accent: "bg-red-400",
      iconColor: "text-red-300",
      iconSurface: "bg-red-400/10",
    },
  };

  const { icon: Icon, label, accent, iconColor, iconSurface } = typeConfig[type];

  return (
    <div className="relative overflow-hidden border border-white/10 bg-[#101010]/95 text-foreground shadow-2xl backdrop-blur-xl">
      <div className={`absolute inset-y-0 left-0 w-1 ${accent}`} />
      <div className="flex items-start gap-3 px-4 py-3.5 sm:px-5">
        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 ${iconSurface}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={2.3} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-custom">
            {label}
          </p>
          <p className="mt-1 break-words text-sm font-medium leading-5 text-foreground-secondary">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
