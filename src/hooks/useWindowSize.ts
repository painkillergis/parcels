import { useEffect, useState } from 'react'

function useWindowSize(): Array<number> {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])
  useEffect(() => {
    const onWindowResize = () =>
      setSize([window.innerWidth, window.innerHeight])
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])
  return size
}

export default useWindowSize
