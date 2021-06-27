import { useEffect, useRef, useState } from 'react'

function App() {
  const parcels = useParcels()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current && parcels !== undefined) {
      const canvas = canvasRef.current!!
      const context = canvas.getContext('2d')!!
      context.fillStyle = '#000'
      context.rect(0, 0, canvas.width, canvas.height)
      context.fill()

      context.strokeStyle = '#FFF'
      context.lineWidth = 1
      parcels?.features
        ?.map((parcel: any) => ({
          ...parcel,
          geometry: {
            ...parcel.geometry,
            coordinates: parcel.geometry.coordinates.map(
              (polygons: Array<Array<Array<any>>>) =>
                polygons.map((polygon) =>
                  polygon.map(([lon, lat]) => [
                    (lon + 94.67442039632837) * 1000 + 1000,
                    (lat - 47.06009890323808) * 1000 + 300,
                  ]),
                ),
            ),
          },
        }))
        .forEach((parcel: any) => {
          parcel.geometry.coordinates.forEach(
            (multiPolygon: Array<Array<Array<number>>>) => {
              multiPolygon.forEach((polygon) => {
                context.moveTo(polygon[0][0], polygon[0][1])
                context.beginPath()
                polygon.slice(1, polygon.length).forEach(([x, y]) => {
                  context.lineTo(x, y)
                })
                context.closePath()
                context.stroke()
              })
            },
          )
        })
    }
  }, [parcels, canvasRef])
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  )
}

function useParcels(): any | undefined {
  const [parcels, setParcels] = useState<any>()
  useEffect(() => {
    fetch('/parcels.geojson')
      .then((response) => response.json())
      .then((parcels) => setParcels(parcels))
  }, [])
  return parcels
}

export default App
