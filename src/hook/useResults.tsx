import { RefObject, useEffect, useRef, useState } from 'react'
import RenderEngine from '../RenderEngine'
import { PagePosition } from '../types'

interface useResultsProps {
  canvasRef: RefObject<HTMLCanvasElement | undefined>
  renderEngineRef: RefObject<RenderEngine>
}

function useResults({ canvasRef, renderEngineRef }: useResultsProps) {
  const [results, setResults] = useState([])
  const lastPositionRef = useRef<PagePosition>()

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current!!
    const renderEngine = renderEngineRef.current!!

    const onMouseDown = (e: PagePosition) => {
      lastPositionRef.current = e
    }

    const onMouseUp = (e: PagePosition) => {
      const lastPosition = lastPositionRef.current!!
      if (
        Math.sqrt(
          (lastPosition.pageX - e.pageX) ** 2 +
            (lastPosition.pageY - e.pageY) ** 2,
        ) < 1
      ) {
        setResults(renderEngine.query({ x: e.pageX, y: e.pageY }))
      }
    }

    const onTouchStart = (e: TouchEvent) => {
      onMouseDown(e.changedTouches[0])
    }

    const onTouchEnd = (e: TouchEvent) => {
      onMouseUp(e.changedTouches[0])
    }

    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', onMouseUp)
    canvas.addEventListener('touchstart', onTouchStart)
    canvas.addEventListener('touchend', onTouchEnd)

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown)
      canvas.removeEventListener('mouseup', onMouseUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      canvas.removeEventListener('touchend', onTouchEnd)
    }
  }, [canvasRef, renderEngineRef])

  return results
}

export default useResults
