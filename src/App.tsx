import { useCallback, useEffect, useRef, useState } from 'react'
import Loading from './component/Loading'
import fetchParcels from './fetch/fetchParcels'
import useDrag from './hook/useDrag'
import useZoom from './hook/useZoom'
import RenderEngine from './RenderEngine'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const renderEngine = useRef(new RenderEngine())
  const [loading, setLoading] = useState(true)

  useDrag({
    canvasRef,
    onDelta: useCallback((delta) => renderEngine.current.pan(delta), []),
  })

  useZoom({
    canvasRef,
    onDelta: useCallback((delta) => renderEngine.current.zoom(delta), []),
  })

  useEffect(() => {
    fetchParcels().then((parcels: any) => {
      renderEngine.current.setParcels(parcels)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current) {
        renderEngine.current.render(canvasRef.current!!)
      }
    }, 1 / 30)
    return () => clearInterval(interval)
  }, [canvasRef])

  return (
    <>
      <Loading loading={loading} />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </>
  )
}

export default App
