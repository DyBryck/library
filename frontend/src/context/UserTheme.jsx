// src/context/useTheme.jsx
import { useContext } from "react";
import { ThemeProviderContext } from "./ThemeProvider"; // Assure-toi d'exporter ThemeProviderContext dans ThemeProvider.jsx

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default useTheme;
