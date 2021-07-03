import { RefObject, useEffect } from 'react'
import { Vector2 } from '../types'

interface useDragProps {
  canvasRef: RefObject<HTMLCanvasElement>
  onDelta: (delta: Vector2) => void
}

function useDrag({ canvasRef, onDelta }: useDragProps) {
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current!!

    let mouseDown = false
    let lastMouseEvent: MouseEvent | undefined = undefined

    const onMouseDown = (e: MouseEvent) => {
      mouseDown = true
      lastMouseEvent = e
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseDown &&
        onDelta({
          x: e.pageX - lastMouseEvent!!.pageX,
          y: e.pageY - lastMouseEvent!!.pageY,
        })
      lastMouseEvent = e
    }

    const onMouseUp = (e: MouseEvent) => {
      mouseDown = false
    }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseup', onMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseup', onMouseUp)
    }
  }, [canvasRef, onDelta])
}

export default useDrag
