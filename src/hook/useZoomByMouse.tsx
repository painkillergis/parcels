import { RefObject, useEffect } from 'react'

interface useZoomByMouseProps {
  canvasRef: RefObject<HTMLCanvasElement>
  onDelta: (delta: number) => void
}

function useZoomByMouse({ canvasRef, onDelta }: useZoomByMouseProps) {
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current!!

    const onWheel = (e: WheelEvent) => {
      onDelta(e.deltaY)
    }

    canvas.addEventListener('wheel', onWheel)

    return () => {
      canvas.removeEventListener('wheel', onWheel)
    }
  }, [canvasRef, onDelta])
}

export default useZoomByMouse
