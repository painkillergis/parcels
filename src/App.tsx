import { useCallback, useEffect, useRef, useState } from 'react'
import Loading from './component/Loading'
import Results from './component/Results'
import fetchParcels from './fetch/fetchParcels'
import useDrag from './hook/useDrag'
import useResults from './hook/useResults'
import useZoomByMouse from './hook/useZoomByMouse'
import useZoomByTouch from './hook/useZoomByTouch'
import RenderEngine from './RenderEngine'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderEngineRef = useRef(new RenderEngine())
  const [loading, setLoading] = useState(true)

  const results = useResults({ canvasRef, renderEngineRef })

  useDrag({
    canvasRef,
    onDelta: useCallback(
      (delta) => renderEngineRef.current.pan(delta),
      [],
    ),
  })

  useZoomByMouse({
    canvasRef,
    onDelta: useCallback(
      (delta) => renderEngineRef.current.zoom(delta),
      [],
    ),
  })

  useZoomByTouch({
    canvasRef,
    onDelta: useCallback(
      (delta) => renderEngineRef.current.zoom(delta),
      [],
    ),
  })

  useEffect(() => {
    const renderEngine = renderEngineRef.current
    const onResize = renderEngine.onResize.bind(renderEngine)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [renderEngineRef])

  useEffect(() => {
    fetchParcels().then((parcels: any) => {
      renderEngineRef.current.setParcels(parcels)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current) {
        renderEngineRef.current.render(canvasRef.current!!)
      }
    }, 1 / 30)
    return () => clearInterval(interval)
  }, [canvasRef])

  return (
    <>
      <Loading loading={loading} />
      <Results results={results} />
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </>
  )
}

export default App
