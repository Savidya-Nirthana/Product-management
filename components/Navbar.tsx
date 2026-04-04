"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sun, Moon } from "lucide-react";
import Link from "next/link";

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
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 16V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 2 7v9a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 20 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <h1 className="text-[22px] font-black tracking-tight text-slate-900 dark:text-white">
            Product <span className="font-semibold text-emerald-600 dark:text-emerald-400">Dashboard</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/add">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm font-semibold rounded-lg px-3 sm:px-4">
              <Plus className="h-5 w-5 sm:mr-1.5 sm:h-4 sm:w-4 stroke-[3]" />
              <span className="hidden sm:inline">Add Product</span>
            </Button>
          </Link>

          {mounted && (
            <div className="flex items-center rounded-full bg-muted p-1 gap-0.5">
              <button
                id="light-mode-toggle"
                onClick={() => setTheme("light")}
                className={`rounded-full flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  currentTheme === "light"
                    ? "bg-slate-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sun className="h-4 w-4" />
                <span className="hidden sm:inline">Light</span>
              </button>
              <button
                id="dark-mode-toggle"
                onClick={() => setTheme("dark")}
                className={`rounded-full flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                  currentTheme === "dark"
                    ? "bg-slate-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">Dark</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
