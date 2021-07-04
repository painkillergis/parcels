import { RefObject, useEffect, useState } from 'react'
import RenderEngine from '../RenderEngine'

interface useResultsProps {
  canvasRef: RefObject<HTMLCanvasElement | undefined>
  renderEngineRef: RefObject<RenderEngine>
}

function useResults({ canvasRef, renderEngineRef }: useResultsProps) {
  const [results, setResults] = useState([])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current!!
    const renderEngine = renderEngineRef.current!!

    const onClick = (e: MouseEvent) => {
      setResults(renderEngine.query({ x: e.pageX, y: e.pageY }))
    }

    canvas.addEventListener('click', onClick)

    return () => {
      canvas.removeEventListener('click', onClick)
    }
  }, [canvasRef, renderEngineRef])

  return results
}

export default useResults
