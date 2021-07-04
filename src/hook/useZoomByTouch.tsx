import { RefObject, useEffect, useRef } from 'react'
import { Vector2 } from '../types'

interface useZoomByTouchProps {
  canvasRef: RefObject<HTMLCanvasElement>
  onDelta: (delta: number) => void
}

function useZoomByTouch({ canvasRef, onDelta }: useZoomByTouchProps) {
  const positionsByTouchIdRef = useRef(new Map<number, Vector2>())
  useEffect(() => {
    const positionsByTouchId = positionsByTouchIdRef.current!!

    if (!canvasRef.current) return
    const canvas = canvasRef.current!!

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      Array.from(e.changedTouches).forEach((touch) =>
        positionsByTouchId.set(touch.identifier, {
          x: touch.pageX,
          y: touch.pageY,
        }),
      )
    }

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (e.changedTouches.length === 2) {
        const [p1, p2] = Array.from(e.changedTouches)
        const distance = Math.sqrt(
          (p1.pageX - p2.pageX) ** 2 + (p1.pageY - p2.pageY) ** 2,
        )
        const [lastP1, lastP2] = [
          positionsByTouchId.get(p1.identifier)!!,
          positionsByTouchId.get(p2.identifier)!!,
        ]
        const lastDistance = Math.sqrt(
          (lastP1.x - lastP2.x) ** 2 + (lastP1.y - lastP2.y) ** 2,
        )
        onDelta((distance - lastDistance) * 10)
      }
      onTouchStart(e)
    }

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      Array.from(e.changedTouches).forEach((touch) => {
        positionsByTouchId.delete(touch.identifier)
      })
    }

    const onTouchCancel = (e: TouchEvent) => {
      e.preventDefault()
      onTouchEnd(e)
    }

    canvas.addEventListener('touchstart', onTouchStart)
    canvas.addEventListener('touchmove', onTouchMove)
    canvas.addEventListener('touchend', onTouchEnd)
    canvas.addEventListener('touchcancel', onTouchCancel)

    return () => {
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      canvas.removeEventListener('touchcancel', onTouchCancel)
    }
  }, [canvasRef, onDelta, positionsByTouchIdRef])
}

export default useZoomByTouch
