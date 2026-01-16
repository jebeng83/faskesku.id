import { useEffect, useState } from "react";

export default function useTheme() {
  const getInitialTheme = () => {
    try {
      const saved = localStorage.getItem("theme-preference");
      if (saved === "light" || saved === "dark" || saved === "system") return saved;
    } catch (_) {}
    return "system";
  };

  const [theme, setTheme] = useState(getInitialTheme);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
    const compute = () => {
      const systemPrefersDark = mediaQuery ? mediaQuery.matches : false;
      const nextIsDark = theme === "dark" || (theme === "system" && systemPrefersDark);
      setIsDark(nextIsDark);
    };
    compute();
    if (mediaQuery) {
      const listener = () => compute();
      if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", listener);
      else if (mediaQuery.addListener) mediaQuery.addListener(listener);
      return () => {
        if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", listener);
        else if (mediaQuery.removeListener) mediaQuery.removeListener(listener);
      };
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem("theme-preference", theme);
    } catch (_) {}
  }, [theme]);

  const cycleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : prev === "dark" ? "system" : "light"));
  const toggleDarkLight = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return { theme, setTheme, isDark, cycleTheme, toggleDarkLight };
}
