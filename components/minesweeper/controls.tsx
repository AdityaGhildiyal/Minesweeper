"use client"

import type { Dispatch, SetStateAction } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Bomb, Clock, RefreshCw, Sun, Moon, Palette } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import type { Difficulty, GameStatus, VisualTheme, DifficultySettings } from "./types"
import { THEMES } from "./constants"

interface GameControlsProps {
  difficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  visualTheme: VisualTheme
  onThemeChange: (theme: VisualTheme) => void
  flagCount: number
  time: number
  gameStatus: GameStatus
  onReset: () => void
  theme: string | undefined
  onThemeToggle: () => void
  customSettings: { rows: number; cols: number; mines: number }
  setCustomSettings: Dispatch<SetStateAction<{ rows: number; cols: number; mines: number }>>
  showCustomDifficulty: boolean
  applyCustomSettings: () => void
  currentDifficultySettings: DifficultySettings
}

export default function GameControls({
  difficulty,
  onDifficultyChange,
  visualTheme,
  onThemeChange,
  flagCount,
  time,
  gameStatus,
  onReset,
  theme,
  onThemeToggle,
  customSettings,
  setCustomSettings,
  showCustomDifficulty,
  applyCustomSettings,
  currentDifficultySettings,
}: GameControlsProps) {
  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <>
      <div className="flex w-full justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Minesweeper</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={onThemeToggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 w-full justify-between items-center mb-4">
        <Tabs
          defaultValue="easy"
          value={difficulty}
          onValueChange={(value) => onDifficultyChange(value as Difficulty)}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {Object.entries(THEMES).map(([key, theme]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => onThemeChange(key as VisualTheme)}
                className={visualTheme === key ? "bg-accent" : ""}
              >
                {theme.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showCustomDifficulty && (
        <div className="w-full p-4 border rounded-md mb-4">
          <h3 className="font-medium mb-3">Custom Difficulty</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <Label>Rows: {customSettings.rows}</Label>
              </div>
              <Slider
                value={[customSettings.rows]}
                min={5}
                max={30}
                step={1}
                onValueChange={(value) => setCustomSettings((prev) => ({ ...prev, rows: value[0] }))}
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <Label>Columns: {customSettings.cols}</Label>
              </div>
              <Slider
                value={[customSettings.cols]}
                min={5}
                max={30}
                step={1}
                onValueChange={(value) => setCustomSettings((prev) => ({ ...prev, cols: value[0] }))}
              />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <Label>Mines: {customSettings.mines}</Label>
                <span className="text-xs text-muted-foreground">
                  {Math.round((customSettings.mines / (customSettings.rows * customSettings.cols)) * 100)}% density
                </span>
              </div>
              <Slider
                value={[customSettings.mines]}
                min={1}
                max={Math.floor(customSettings.rows * customSettings.cols * 0.35)}
                step={1}
                onValueChange={(value) => setCustomSettings((prev) => ({ ...prev, mines: value[0] }))}
              />
            </div>
            <Button onClick={applyCustomSettings} className="w-full">
              Apply
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between w-full items-center mb-4">
        <Badge variant="outline" className="flex items-center gap-1 text-lg p-3">
          <Bomb className="h-5 w-5" />
          <span>{currentDifficultySettings.mines - flagCount}</span>
        </Badge>

        <Button variant="outline" size="sm" onClick={onReset} className="flex items-center gap-1 px-4 py-2 text-base">
          <RefreshCw className="h-5 w-5 mr-1" />
          Reset
        </Button>

        <Badge variant="outline" className="flex items-center gap-1 text-lg p-3">
          <Clock className="h-5 w-5" />
          <span>{formatTime(time)}</span>
        </Badge>
      </div>
    </>
  )
}

