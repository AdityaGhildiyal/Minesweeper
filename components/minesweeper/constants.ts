import type { ThemeColors } from "./types"

// Game difficulty presets
export const DIFFICULTY_PRESETS = {
  easy: { rows: 9, cols: 9, mines: 10, name: "Easy" },
  medium: { rows: 16, cols: 16, mines: 40, name: "Medium" },
  hard: { rows: 22, cols: 22, mines: 60, name: "Hard" },
}

// Visual themes
export const THEMES: Record<string, ThemeColors> = {
  classic: {
    name: "Classic",
    cellBg: "bg-gray-300 dark:bg-gray-600",
    cellHover: "hover:bg-gray-200 dark:hover:bg-gray-500",
    revealedBg: "bg-gray-100 dark:bg-gray-800",
    mineBg: "bg-red-200 dark:bg-red-900/50",
    flagColor: "text-red-500 dark:text-red-400",
    mineColor: "text-black dark:text-white",
    gridBg: "bg-gray-200 dark:bg-gray-700",
  },
  space: {
    name: "Space",
    cellBg: "bg-indigo-900 dark:bg-indigo-950",
    cellHover: "hover:bg-indigo-800 dark:hover:bg-indigo-900",
    revealedBg: "bg-slate-900 dark:bg-slate-950",
    mineBg: "bg-orange-500/30 dark:bg-orange-500/50",
    flagColor: "text-yellow-400 dark:text-yellow-300",
    mineColor: "text-orange-500 dark:text-orange-400",
    gridBg: "bg-slate-800 dark:bg-slate-900",
  },
  pirate: {
    name: "Pirate",
    cellBg: "bg-amber-700 dark:bg-amber-900",
    cellHover: "hover:bg-amber-600 dark:hover:bg-amber-800",
    revealedBg: "bg-amber-100 dark:bg-amber-950",
    mineBg: "bg-black/30 dark:bg-black/50",
    flagColor: "text-red-600 dark:text-red-500",
    mineColor: "text-black dark:text-amber-300",
    gridBg: "bg-amber-500 dark:bg-amber-800",
  },
  retro: {
    name: "Retro Arcade",
    cellBg: "bg-emerald-700 dark:bg-emerald-900",
    cellHover: "hover:bg-emerald-600 dark:hover:bg-emerald-800",
    revealedBg: "bg-emerald-300 dark:bg-emerald-950",
    mineBg: "bg-purple-500/30 dark:bg-purple-500/50",
    flagColor: "text-purple-500 dark:text-purple-400",
    mineColor: "text-purple-700 dark:text-purple-300",
    gridBg: "bg-emerald-500 dark:bg-emerald-800",
  },
  neon: {
    name: "Neon",
    cellBg: "bg-gray-900 dark:bg-black",
    cellHover: "hover:bg-gray-800 dark:hover:bg-gray-900",
    revealedBg: "bg-gray-800 dark:bg-gray-950",
    mineBg: "bg-pink-500/30 dark:bg-pink-500/50",
    flagColor: "text-cyan-400 dark:text-cyan-300",
    mineColor: "text-pink-500 dark:text-pink-400",
    gridBg: "bg-gray-950 dark:bg-black",
  },
}

