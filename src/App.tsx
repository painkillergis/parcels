import { useEffect, useRef } from 'react'
import GameEngine from './GameEngine'

const gameEngine = new GameEngine()

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      gameEngine.setCanvas(canvasRef.current)
    }
  }, [canvasRef])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  )
}

export default App
