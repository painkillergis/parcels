import { useRef } from 'react'
import GameEngine, { Vector2 } from './GameEngine'
import useCanvasEffect from './hooks/useCanvasEffect'

const gameEngine = new GameEngine()

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useCanvasEffect((canvas) => {
    gameEngine.setCanvas(canvas)
    return () => gameEngine.stop()
  }, canvasRef)

  const panning = useRef<Boolean>(false)
  useCanvasEffect((canvas) => {
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
  }, canvasRef)

  const lastMouseLocation = useRef<Vector2>()
  useCanvasEffect((canvas) => {
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
  }, canvasRef)

  useCanvasEffect((canvas) => {
    const onWheel = (e: WheelEvent) => {
      gameEngine.zoom(e.deltaY)
    }
    canvas.addEventListener('wheel', onWheel)
    return () => canvas.removeEventListener('wheel', onWheel)
  }, canvasRef)

  const lastMouseDownEvent = useRef<MouseEvent>()
  useCanvasEffect((canvas) => {
    const onMouseDown = (e: MouseEvent) => (lastMouseDownEvent.current = e)
    const onMouseUp = (e: MouseEvent) => {
      const dx = e.pageX - lastMouseDownEvent.current!.pageX
      const dy = e.pageY - lastMouseDownEvent.current!.pageY
      if (Math.sqrt(dx ** 2 + dy ** 2) < 8) {
        gameEngine.createTower({
          x: e.pageX,
          y: e.pageY,
        })
      }
    }
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mouseup', onMouseUp)
    }
  }, canvasRef)

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
