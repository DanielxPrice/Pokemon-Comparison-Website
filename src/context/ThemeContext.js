// context/ThemeContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// context shell
const ThemeContext = createContext();

// custom hook so I dont need to import useContext everywhere
export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  // read from localStorage if possible so refresh keeps theme
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("theme") || "light"
  );

  // whenever theme changes, sync it to body and localStorage
  useEffect(() => {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(`theme-${theme}`);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  // flip theme
  function toggleTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
