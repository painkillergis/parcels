import { useLayoutEffect, useRef } from 'react'
import useWindowSize from './hooks/useWindowSize'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, height] = useWindowSize()
  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const context = (canvasRef.current as HTMLCanvasElement).getContext(
        '2d',
      )!
      context.fillStyle = 'black'
      context.fillRect(0, 0, width, height)
    }
  }, [canvasRef, width, height])
  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      width={width}
      height={height}
    />
  )
}

export default App
