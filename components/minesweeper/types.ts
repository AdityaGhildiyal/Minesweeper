export type CellState = {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines: number
}

export type GameStatus = "playing" | "won" | "lost"

export type Difficulty = "easy" | "medium" | "hard" | "custom"

export type VisualTheme = "classic" | "space" | "pirate" | "retro" | "neon"

export type ThemeColors = {
  name: string
  cellBg: string
  cellHover: string
  revealedBg: string
  mineBg: string
  flagColor: string
  mineColor: string
  gridBg: string
}

export type DifficultySettings = {
  rows: number
  cols: number
  mines: number
  name: string
}

