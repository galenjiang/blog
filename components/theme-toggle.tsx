"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Moon, Sun, TvMinimal } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  /**
   * 如果是现在是light,
   *  1. 和系统不一致，切到系统就行
   *  2. 和系统一致，切到dark
   * 如果是现在是dark,
   *  1. 和系统不一致，切到系统就行
   *  2. 和系统一致，切到light
   *
   */
  function toggleTheme() {
    const systemRequestTheme = window.matchMedia(
      "(prefers-color-scheme: light)",
    ).matches
      ? "light"
      : "dark";
    if (theme === "system") {
      // 不满意当前的主题，切换到和系统不一致的就行
      setTheme(systemRequestTheme === "light" ? "dark" : "light");
    } else if (theme !== systemRequestTheme) {
      setTheme("system");
    } else {
      // 如果theme === systemRequestTheme
      setTheme(systemRequestTheme === "light" ? "dark" : "light");
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button variant="ghost" onClick={toggleTheme}>
      {/*<span>{theme}</span>*/}
      {theme === "system" ? (
        <TvMinimal />
      ) : theme === "light" ? (
        <Sun />
      ) : (
        <Moon />
      )}
    </Button>
  );
}
