import Minesweeper from "@/components/minesweeper"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 transition-colors">
      <Minesweeper />
    </main>
  )
}

