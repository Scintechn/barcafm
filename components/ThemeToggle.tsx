"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  // Render a stable placeholder on the server, hydrate to the real theme on the client.
  const [mounted, setMounted] = useState(false);
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState(getInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setThemeState(next);
  }

  const label = mounted
    ? theme === "dark"
      ? "Light theme"
      : "Dark theme"
    : "Toggle theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full",
        "border border-ink-200 text-ink-700 transition-colors",
        "hover:bg-ink-100 hover:text-ink-900",
        "dark:border-ink-700 dark:text-ink-300",
        "dark:hover:bg-ink-800 dark:hover:text-white",
        className
      )}
    >
      {/* Render both — CSS handles which is visible. Avoids flash on toggle. */}
      <Sun className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}
