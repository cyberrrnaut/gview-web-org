"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {/* Display Sun icon in Dark Mode, Moon icon in Light Mode */}
        {theme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
