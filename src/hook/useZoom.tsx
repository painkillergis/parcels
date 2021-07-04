import { RefObject, useEffect } from 'react'

interface useZoomProps {
  canvasRef: RefObject<HTMLCanvasElement>
  onDelta: (delta: number) => void
}

function useZoom({ canvasRef, onDelta }: useZoomProps) {
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

export default useZoom
