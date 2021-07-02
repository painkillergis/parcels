import { useEffect, useRef, useState } from 'react'
import { toScreenCoordinates } from './service/CoordinateTransformations'
import 'google-protobuf'
const { Parcels } = require('./proto/parcels_pb')

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
      parcels
        ?.map((points: any) =>
          toScreenCoordinates(
            { width: canvas.width, height: canvas.height },
            { x: -94.87038174907313, y: 46.90248960427145 },
            6000,
            points,
          ),
        )
        .forEach((points: any) => {
          context.moveTo(points[0][0], points[0][1])
          context.beginPath()
          points.slice(1, points.length).forEach(([x, y]: any) => {
            context.lineTo(x, y)
          })
          context.closePath()
          context.stroke()
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
    fetch('/parcels.pbf')
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        Parcels.deserializeBinary(new Uint8Array(arrayBuffer)),
      )
      .then((container) =>
        container
          .getParcelsList()
          .map((parcel: any) =>
            parcel
              .getPointsList()
              .map((point: any) => [
                point.getLongitude(),
                point.getLatitude(),
              ]),
          ),
      )
      .then((parcels) => setParcels(parcels))
  }, [])
  return parcels
}

export default App
