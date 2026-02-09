import { createContext, useContext, useState, useEffect } from "react";

interface Theme {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<Theme | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        return true;
      } else if (savedTheme === "light") {
        return false;
      } else {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    }
    return false;
  });

  useEffect(() => {
    // Apply theme to HTML element
    if (isDark) {
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
