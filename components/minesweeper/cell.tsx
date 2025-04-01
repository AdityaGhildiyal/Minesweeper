"use client"

import type React from "react"

import type { CellState, ThemeColors } from "./types"
import { Bomb, Flag } from "lucide-react"

interface CellProps {
  cell: CellState
  rowIndex: number
  colIndex: number
  onReveal: () => void
  onFlag: (e: React.MouseEvent) => void
  themeColors: ThemeColors
}

export default function Cell({ cell, rowIndex, colIndex, onReveal, onFlag, themeColors }: CellProps) {
  // Get cell color based on adjacent mines
  const getCellColor = () => {
    if (!cell.isRevealed) return ""

    const colors = [
      "", // 0 mines
      "text-blue-600 dark:text-blue-400", // 1 mine
      "text-green-600 dark:text-green-400", // 2 mines
      "text-red-600 dark:text-red-400", // 3 mines
      "text-purple-600 dark:text-purple-400", // 4 mines
      "text-yellow-600 dark:text-yellow-500", // 5 mines
      "text-teal-600 dark:text-teal-400", // 6 mines
      "text-pink-600 dark:text-pink-400", // 7 mines
      "text-gray-600 dark:text-gray-400", // 8 mines
    ]

    return colors[cell.adjacentMines] || ""
  }

  return (
    <div
      className={`
        flex items-center justify-center
        ${
          cell.isRevealed
            ? `${themeColors.revealedBg}`
            : `${themeColors.cellBg} ${themeColors.cellHover} cursor-pointer`
        }
        ${cell.isMine && cell.isRevealed ? themeColors.mineBg : ""}
        ${getCellColor()}
        w-8 h-8 sm:w-10 sm:h-10 text-base sm:text-lg font-medium select-none
      `}
      onClick={onReveal}
      onContextMenu={onFlag}
    >
      {cell.isRevealed ? (
        cell.isMine ? (
          <Bomb className={`h-5 w-5 ${themeColors.mineColor}`} />
        ) : cell.adjacentMines > 0 ? (
          cell.adjacentMines
        ) : null
      ) : cell.isFlagged ? (
        <Flag className={`h-5 w-5 ${themeColors.flagColor}`} />
      ) : null}
    </div>
  )
}

