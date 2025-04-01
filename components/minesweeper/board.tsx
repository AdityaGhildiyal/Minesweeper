import type { Dispatch, SetStateAction } from "react"
import type { CellState, GameStatus, ThemeColors, DifficultySettings } from "./types"
import Cell from "./cell"

interface GameBoardProps {
  board: CellState[][]
  setBoard: Dispatch<SetStateAction<CellState[][]>>
  gameStatus: GameStatus
  setGameStatus: Dispatch<SetStateAction<GameStatus>>
  flagCount: number
  setFlagCount: Dispatch<SetStateAction<number>>
  firstClick: boolean
  handleFirstClick: (row: number, col: number) => CellState[][]
  revealAllMines: () => void
  checkWinCondition: () => void
  themeColors: ThemeColors
  difficultySettings: DifficultySettings
  setTimerActive: Dispatch<SetStateAction<boolean>>
}

export default function GameBoard({
  board,
  setBoard,
  gameStatus,
  setGameStatus,
  flagCount,
  setFlagCount,
  firstClick,
  handleFirstClick,
  revealAllMines,
  checkWinCondition,
  themeColors,
  difficultySettings,
  setTimerActive,
}: GameBoardProps) {
  // Reveal a cell
  const revealCell = (row: number, col: number) => {
    if (gameStatus !== "playing" || board[row][col].isRevealed || board[row][col].isFlagged) {
      return
    }

    let currentBoard = [...board]

    // Handle first click
    if (firstClick) {
      currentBoard = handleFirstClick(row, col)
    }

    // If clicked on a mine, game over
    if (currentBoard[row][col].isMine) {
      revealAllMines()
      setGameStatus("lost")
      setTimerActive(false)
      return
    }

    // Reveal the cell
    const newBoard = [...currentBoard]
    newBoard[row][col].isRevealed = true
    setBoard(newBoard)

    // If cell has no adjacent mines, reveal adjacent cells recursively
    if (newBoard[row][col].adjacentMines === 0) {
      revealAdjacentCells(row, col, newBoard)
    }

    // Check if player has won
    checkWinCondition()
  }

  // Reveal all adjacent cells (for cells with 0 adjacent mines)
  const revealAdjacentCells = (row: number, col: number, currentBoard: CellState[][]) => {
    const { rows, cols } = difficultySettings
    const newBoard = [...currentBoard]

    // Check all 8 adjacent cells
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue
        const ni = row + di
        const nj = col + dj

        if (
          ni >= 0 &&
          ni < rows &&
          nj >= 0 &&
          nj < cols &&
          !newBoard[ni][nj].isRevealed &&
          !newBoard[ni][nj].isFlagged
        ) {
          newBoard[ni][nj].isRevealed = true

          // Recursively reveal adjacent cells if this cell also has 0 adjacent mines
          if (newBoard[ni][nj].adjacentMines === 0) {
            revealAdjacentCells(ni, nj, newBoard)
          }
        }
      }
    }

    setBoard(newBoard)
  }

  // Toggle flag on a cell
  const toggleFlag = (row: number, col: number) => {
    if (gameStatus !== "playing" || board[row][col].isRevealed) {
      return
    }

    // Don't allow placing more flags than mines
    if (!board[row][col].isFlagged && flagCount >= difficultySettings.mines) {
      return
    }

    const newBoard = [...board]
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
    setBoard(newBoard)

    // Update flag count
    setFlagCount(newBoard[row][col].isFlagged ? flagCount + 1 : flagCount - 1)

    // Start timer on first flag if it hasn't started yet
    if (firstClick) {
      handleFirstClick(row, col)
    }
  }

  // Calculate grid template columns based on difficulty
  const gridTemplateColumns = () => {
    const { cols } = difficultySettings
    return `repeat(${cols}, minmax(0, 1fr))`
  }

  return (
    <div
      className={`
        grid gap-px ${themeColors.gridBg} p-1 rounded-md
        ${gameStatus === "lost" ? "bg-red-100 dark:bg-red-900/20" : ""}
        ${gameStatus === "won" ? "bg-green-100 dark:bg-green-900/20" : ""}
      `}
      style={{
        gridTemplateColumns: gridTemplateColumns(),
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            cell={cell}
            rowIndex={rowIndex}
            colIndex={colIndex}
            onReveal={() => revealCell(rowIndex, colIndex)}
            onFlag={(e) => {
              e.preventDefault()
              toggleFlag(rowIndex, colIndex)
            }}
            themeColors={themeColors}
          />
        )),
      )}
    </div>
  )
}

