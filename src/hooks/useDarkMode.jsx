import { useState, useEffect, useCallback } from "react";

const LOCAL_STORAGE_KEY = "mode";

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem(LOCAL_STORAGE_KEY) === "dark";
      return isDark;
    }

    return false;
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("theme", "dark");
      localStorage.setItem(LOCAL_STORAGE_KEY, "dark");
    } else {
      document.documentElement.setAttribute("theme", "light");
      localStorage.setItem(LOCAL_STORAGE_KEY, "light");
    }
  }, [isDarkMode]);

  return { toggleDarkMode };
};

export default useDarkMode;
