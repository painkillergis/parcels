import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useWindowSize from './hooks/useWindowSize'

interface Point {
  x: number
  y: number
}

interface Customer extends Point {}

interface Tower extends Point {}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [width, height] = useWindowSize()

  const [customers, setCustomers] = useState<Array<Customer>>([])
  useEffect(() => {
    setCustomers(
      Array(100)
        .fill(null)
        .map(() => {
          const magnitude = Math.random() ** 2 * 512
          const angle = Math.random() * Math.PI * 2
          return {
            x: Math.sin(angle) * magnitude,
            y: Math.cos(angle) * magnitude,
          }
        }),
    )
  }, [])

  const [towers, setTowers] = useState<Array<Tower>>([])
  useEffect(() => {
    setTowers(
      Array(1)
        .fill(null)
        .map(() => {
          const magnitude = 64
          const angle = Math.random() * Math.PI * 2
          return {
            x: Math.sin(angle) * magnitude,
            y: Math.cos(angle) * magnitude,
          }
        }),
    )
  }, [])

  useLayoutEffect(() => {
    if (canvasRef.current !== null) {
      const context = (canvasRef.current as HTMLCanvasElement).getContext(
        '2d',
      )!
      context.fillStyle = 'black'
      context.fillRect(0, 0, width, height)

      context.fillStyle = 'gray'
      customers
        .map(({ x, y }) => ({ x: x + width / 2, y: y + height / 2 }))
        .filter(
          ({ x, y }) => x >= 0 && x <= width && y >= 0 && y <= height,
        )
        .forEach(({ x, y }) => {
          context.beginPath()
          context.ellipse(x, y, 4, 4, 0, 0, Math.PI * 2)
          context.fill()
        })

      context.strokeStyle = 'green'
      towers
        .map(({ x, y }) => ({ x: x + width / 2, y: y + height / 2 }))
        .filter(
          ({ x, y }) => x >= 0 && x <= width && y >= 0 && y <= height,
        )
        .forEach(({ x, y }) => {
          context.beginPath()
          context.ellipse(x, y, 64, 64, 0, 0, Math.PI * 2)
          context.stroke()
        })
    }
  }, [canvasRef, width, height, customers, towers])

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
