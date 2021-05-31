import { useEffect, useState } from 'react'

interface Viewport {
  width: number
  height: number
}

function useViewport(): Viewport {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  useEffect(() => {
    const onWindowResize = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])
  return viewport
}

export default useViewport
