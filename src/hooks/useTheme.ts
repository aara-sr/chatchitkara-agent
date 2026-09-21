"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "chitkara-theme";

function readStoredTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing React state from the DOM attribute the inline theme script sets before hydration; avoids a hydration mismatch.
  useEffect(() => { setTheme(readStoredTheme()); }, []);
  const apply = useCallback((next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { window.localStorage.setItem(STORAGE_KEY, next); } catch { /* storage unavailable */ }
  }, []);
  const toggle = useCallback(() => apply(theme === "dark" ? "light" : "dark"), [theme, apply]);
  return { theme, toggle, setTheme: apply };
}
