"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <h1 className="text-slate-500 font-bold text-[25px]">
            Project Management
          </h1>
        </div>

        {mounted && (
          <div className="flex items-center rounded-full bg-muted p-1 gap-0.5">
            <button
              id="light-mode-toggle"
              onClick={() => setTheme("light")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                currentTheme === "light"
                  ? "bg-slate-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Light Mode
            </button>
            <button
              id="dark-mode-toggle"
              onClick={() => setTheme("dark")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                currentTheme === "dark"
                  ? "bg-slate-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dark Mode
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
