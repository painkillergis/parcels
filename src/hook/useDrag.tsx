import { RefObject, useEffect } from 'react'
import { Vector2 } from '../types'

interface useDragProps {
  canvasRef: RefObject<HTMLCanvasElement>
  onDelta: (delta: Vector2) => void
}

interface ScreenLocation {
  pageX: number
  pageY: number
}

function useDrag({ canvasRef, onDelta }: useDragProps) {
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current!!

    let mouseDown = false
    let lastMouseEvent: ScreenLocation | undefined = undefined

    const onMouseDown = (e: ScreenLocation) => {
      mouseDown = true
      lastMouseEvent = e
    }

    const onTouchStart = (e: TouchEvent) => {
      mouseDown = true
      onMouseDown(e.targetTouches[0])
    }

    const onMouseMove = (e: ScreenLocation) => {
      mouseDown &&
        onDelta({
          x: e.pageX - lastMouseEvent!!.pageX,
          y: e.pageY - lastMouseEvent!!.pageY,
        })
      lastMouseEvent = e
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.targetTouches.length === 1) {
        onMouseMove(e.targetTouches[0])
      }
    }

    const onMouseUp = () => {
      mouseDown = false
    }

    const onTouchEnd = () => {
      onMouseUp()
    }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('touchstart', onTouchStart)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('touchmove', onTouchMove)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('touchend', onTouchEnd)

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [canvasRef, onDelta])
}

export default useDrag
