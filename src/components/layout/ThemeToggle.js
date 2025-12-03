// components/layout/ThemeToggle.js
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    // simple pill button that flips state
    <button
      type="button"
      className="themeToggle"
      onClick={toggleTheme}
    >
      {theme === "light" ? "Light" : "Dark"}
    </button>
  );
}

export default ThemeToggle;
