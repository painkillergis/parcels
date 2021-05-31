import { useEffect, useRef } from 'react'
import GameEngine, { Vector2 } from './GameEngine'

const gameEngine = new GameEngine()

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const panning = useRef<Boolean>(false)
  const lastMouseLocation = useRef<Vector2>()

  useEffect(() => {
    if (canvasRef.current) {
      gameEngine.setCanvas(canvasRef.current)
      return () => gameEngine.stop()
    }
  }, [canvasRef])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current

      const startPanning = () => (panning.current = true)
      const finishPanning = () => (panning.current = false)

      canvas.addEventListener('mousedown', startPanning)
      canvas.addEventListener('mouseup', finishPanning)
      canvas.addEventListener('mouseleave', finishPanning)

      return () => {
        canvas.removeEventListener('mousedown', startPanning)
        canvas.removeEventListener('mouseup', finishPanning)
        canvas.removeEventListener('mouseleave', finishPanning)
      }
    }
  }, [canvasRef])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const onMouseMove = (e: MouseEvent) => {
        if (panning.current && lastMouseLocation.current) {
          gameEngine.pan({
            x: e.pageX - lastMouseLocation.current.x,
            y: e.pageY - lastMouseLocation.current.y,
          })
        }
        lastMouseLocation.current = { x: e.pageX, y: e.pageY }
      }
      canvas.addEventListener('mousemove', onMouseMove)

      return () => canvas.removeEventListener('mousemove', onMouseMove)
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
