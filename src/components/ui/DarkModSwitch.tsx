"use client";

import React, { useEffect, useState } from "react";
import { FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { BsFillMoonFill } from "react-icons/bs";

export default function DarkModeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    const handleThemeToggle = () => {
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    };

    if (currentTheme === "dark") {
      return (
        <FiSun
          className="mt-4 h-7 w-7 cursor-pointer text-yellow-500 transition-colors hover:text-amber-500 focus:text-amber-500 focus:outline-none sm:text-2xl"
          role="button"
          onClick={handleThemeToggle}
          aria-label="Switch to light mode"
        />
      );
    }

    return (
      <BsFillMoonFill
        className="mt-4 h-6 w-6 cursor-pointer  text-gray-900 transition-colors hover:text-gray-700 focus:text-gray-700 focus:outline-none sm:text-2xl"
        role="button"
        onClick={handleThemeToggle}
        aria-label="Switch to dark mode"
      />
    );
  };

  return <div>{renderThemeChanger()}</div>;
}
