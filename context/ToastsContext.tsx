"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastsContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastsContext = createContext<ToastsContextType | undefined>(undefined);

export function ToastsProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  return (
    <ToastsContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`px-5 py-3.5 rounded-xl shadow-xl border text-white text-sm font-semibold transition-all shadow-black/10 origin-bottom 
            animate-in slide-in-from-bottom-4 slide-in-from-right-4 fade-in-0 duration-300
            ${toast.type === "success" ? "bg-emerald-600 border-emerald-500/30" : ""}
            ${toast.type === "error" ? "bg-rose-600 border-rose-500/30" : ""}
            ${toast.type === "info" ? "bg-slate-800 border-slate-700" : ""}`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              )}
              {toast.type === "error" && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              )}
              {toast.message}
            </div>
          </div>
        ))}
      </div>
    </ToastsContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastsContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastsProvider");
  }
  return context;
}
