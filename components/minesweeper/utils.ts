import type { CellState, DifficultySettings } from "./types"

// Initialize the game board
export const initializeBoard = (settings: DifficultySettings): CellState[][] => {
  const { rows, cols } = settings
  const newBoard: CellState[][] = []

  for (let i = 0; i < rows; i++) {
    const row: CellState[] = []
    for (let j = 0; j < cols; j++) {
      row.push({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      })
    }
    newBoard.push(row)
  }

  return newBoard
}

// Place mines on the board (after first click)
export const placeMines = (
  board: CellState[][],
  firstRow: number,
  firstCol: number,
  settings: DifficultySettings,
): CellState[][] => {
  const { rows, cols, mines } = settings
  const newBoard = JSON.parse(JSON.stringify(board))
  let minesPlaced = 0

  while (minesPlaced < mines) {
    const randomRow = Math.floor(Math.random() * rows)
    const randomCol = Math.floor(Math.random() * cols)

    // Don't place a mine on the first clicked cell or its adjacent cells
    const isAdjacent = Math.abs(randomRow - firstRow) <= 1 && Math.abs(randomCol - firstCol) <= 1

    if (!newBoard[randomRow][randomCol].isMine && !(randomRow === firstRow && randomCol === firstCol) && !isAdjacent) {
      newBoard[randomRow][randomCol].isMine = true
      minesPlaced++
    }
  }

  // Calculate adjacent mines for each cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!newBoard[i][j].isMine) {
        let count = 0
        // Check all 8 adjacent cells
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            if (di === 0 && dj === 0) continue
            const ni = i + di
            const nj = j + dj
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && newBoard[ni][nj].isMine) {
              count++
            }
          }
        }
        newBoard[i][j].adjacentMines = count
      }
    }
  }

  return newBoard
}

