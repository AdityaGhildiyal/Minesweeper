"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import GameBoard from "./board"
import GameControls from "./controls"
import type { CellState, GameStatus, Difficulty, VisualTheme } from "./types"
import { initializeBoard, placeMines } from "./utils"
import { DIFFICULTY_PRESETS, THEMES } from "./constants"

export default function Minesweeper() {
  // Game state
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [customSettings, setCustomSettings] = useState({ rows: 12, cols: 12, mines: 20 })
  const [board, setBoard] = useState<CellState[][]>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing")
  const [flagCount, setFlagCount] = useState(0)
  const [time, setTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [firstClick, setFirstClick] = useState(true)
  const [visualTheme, setVisualTheme] = useState<VisualTheme>("classic")
  const [showCustomDifficulty, setShowCustomDifficulty] = useState(false)

  const { theme, setTheme } = useTheme()

  // Get current difficulty settings
  const getCurrentDifficultySettings = () => {
    if (difficulty === "custom") {
      return customSettings
    }
    return DIFFICULTY_PRESETS[difficulty]
  }

  // Reset the game
  const resetGame = () => {
    const newBoard = initializeBoard(getCurrentDifficultySettings())
    setBoard(newBoard)
    setGameStatus("playing")
    setFlagCount(0)
    setTime(0)
    setTimerActive(false)
    setFirstClick(true)
  }

  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty)
    setGameStatus("playing")
    setFlagCount(0)
    setTime(0)
    setTimerActive(false)
    setFirstClick(true)

    if (newDifficulty === "custom") {
      setShowCustomDifficulty(true)
    } else {
      setShowCustomDifficulty(false)
    }
  }

  // Apply custom difficulty settings
  const applyCustomSettings = () => {
    // Validate settings
    const maxMines = Math.floor(customSettings.rows * customSettings.cols * 0.35)
    if (customSettings.mines > maxMines) {
      setCustomSettings((prev) => ({ ...prev, mines: maxMines }))
      return
    }

    resetGame()
    setShowCustomDifficulty(false)
  }

  // Handle first click
  const handleFirstClick = (row: number, col: number) => {
    const newBoard = placeMines(board, row, col, getCurrentDifficultySettings())
    setBoard(newBoard)
    setFirstClick(false)
    setTimerActive(true)
    return newBoard
  }

  // Reveal all mines when game is lost
  const revealAllMines = () => {
    const newBoard = [...board]
    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard[i].length; j++) {
        if (newBoard[i][j].isMine) {
          newBoard[i][j].isRevealed = true
        }
      }
    }
    setBoard(newBoard)
  }

  // Check if player has won
  const checkWinCondition = () => {
    const { rows, cols, mines } = getCurrentDifficultySettings()
    let revealedCount = 0

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (board[i][j].isRevealed) {
          revealedCount++
        }
      }
    }

    // Player wins if all non-mine cells are revealed
    if (revealedCount === rows * cols - mines) {
      setGameStatus("won")
      setTimerActive(false)
    }
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Initialize board when difficulty changes
  useEffect(() => {
    resetGame()
  }, [difficulty, customSettings])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (timerActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive])

  return (
    <Card className="w-full max-w-5xl shadow-lg">
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col items-center space-y-6">
          <GameControls
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
            visualTheme={visualTheme}
            onThemeChange={setVisualTheme}
            flagCount={flagCount}
            time={time}
            gameStatus={gameStatus}
            onReset={resetGame}
            theme={theme}
            onThemeToggle={toggleTheme}
            customSettings={customSettings}
            setCustomSettings={setCustomSettings}
            showCustomDifficulty={showCustomDifficulty}
            applyCustomSettings={applyCustomSettings}
            currentDifficultySettings={getCurrentDifficultySettings()}
          />

          <GameBoard
            board={board}
            setBoard={setBoard}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            flagCount={flagCount}
            setFlagCount={setFlagCount}
            firstClick={firstClick}
            handleFirstClick={handleFirstClick}
            revealAllMines={revealAllMines}
            checkWinCondition={checkWinCondition}
            themeColors={THEMES[visualTheme]}
            difficultySettings={getCurrentDifficultySettings()}
            setTimerActive={setTimerActive}
          />

          {gameStatus !== "playing" && (
            <div
              className={`
              mt-4 p-3 rounded-md text-center font-bold w-full text-lg
              ${
                gameStatus === "won"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
              }
            `}
            >
              {gameStatus === "won" ? "You Won! 🎉" : "Game Over! 💥"}
            </div>
          )}

          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            <p>Left click to reveal a cell, right click to place a flag.</p>
          </div>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  )
}

