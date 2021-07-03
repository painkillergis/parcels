import { toScreenCoordinates } from './service/CoordinateTransformations'

class RenderEngine {
  parcels: Array<Array<number>> = []

  render(canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')!!
    context.fillStyle = '#000'
    context.rect(0, 0, canvas.width, canvas.height)
    context.fill()

    context.strokeStyle = '#FFF'
    context.lineWidth = 1
    this.parcels
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

  setParcels(parcels: Array<Array<number>>) {
    this.parcels = parcels
  }
}

export default RenderEngine
