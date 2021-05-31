import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useViewport from './hooks/useViewport'

interface Point {
  x: number
  y: number
}

interface Customer {
  location: Point
}

interface Tower {
  location: Point
}

function toScreenLocation(
  width: number,
  height: number,
  { x, y }: Point,
): Point {
  return {
    x: x + width / 2,
    y: y + height / 2,
  }
}

interface Envelope {
  left: number
  top: number
  right: number
  bottom: number
}

function contains(envelope: Envelope, location: Point) {
  return (
    location.x >= envelope.left &&
    location.x <= envelope.right &&
    location.y >= envelope.top &&
    location.y <= envelope.bottom
  )
}

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { width, height } = useViewport()

  const [customers, setCustomers] = useState<Array<Customer>>([])
  useEffect(() => {
    setCustomers(
      Array(100)
        .fill(null)
        .map(() => {
          const magnitude = Math.random() ** 2 * 512
          const angle = Math.random() * Math.PI * 2
          return {
            location: {
              x: Math.sin(angle) * magnitude,
              y: Math.cos(angle) * magnitude,
            },
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
            location: {
              x: Math.sin(angle) * magnitude,
              y: Math.cos(angle) * magnitude,
            },
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
        .map((customer) => ({
          ...customer,
          location: toScreenLocation(width, height, customer.location),
        }))
        .filter(({ location }) =>
          contains(
            { left: 0, top: 0, right: width, bottom: height },
            location,
          ),
        )
        .forEach(({ location }) => {
          context.beginPath()
          context.ellipse(location.x, location.y, 4, 4, 0, 0, Math.PI * 2)
          context.fill()
        })

      context.strokeStyle = 'green'
      towers
        .map((tower) => ({
          ...tower,
          location: toScreenLocation(width, height, tower.location),
        }))
        .filter(({ location }) =>
          contains(
            { left: 0, top: 0, right: width, bottom: height },
            location,
          ),
        )
        .forEach(({ location }) => {
          context.beginPath()
          context.ellipse(
            location.x,
            location.y,
            64,
            64,
            0,
            0,
            Math.PI * 2,
          )
          context.stroke()
        })
    }
  }, [canvasRef, width, height, customers, towers])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
      width={width}
      height={height}
    />
  )
}

export default App
