import { RefObject, useEffect } from 'react'

function useCanvasEffect(
  effect: (canvas: HTMLCanvasElement) => void | (() => void),
  canvasRef: RefObject<HTMLCanvasElement>,
) {
  useEffect(() => {
    if (canvasRef.current) {
      return effect(canvasRef.current)
    }
  }, [canvasRef, effect])
}

export default useCanvasEffect
