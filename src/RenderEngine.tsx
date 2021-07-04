import { toScreenCoordinates } from './service/CoordinateTransformations'
import getEnvelope from './service/getEnvelope'
import { IndexedParcel, Vector2 } from './types'
const RBush = require('rbush')

class RenderEngine {
  center: Vector2 = { x: -94.87038174907313, y: 46.90248960427145 }
  zoomValue: number = 128
  parcels: any = new RBush()
  hasUpdated: Boolean = false

  render(canvas: HTMLCanvasElement) {
    if (!this.hasUpdated) return
    this.hasUpdated = false

    const context = canvas.getContext('2d')!!
    context.fillStyle = '#000'
    context.rect(0, 0, canvas.width, canvas.height)
    context.fill()

    context.strokeStyle = '#FFF'
    context.lineWidth = 1

    const squareZoom = this.zoomValue ** 2

    this.parcels
      .search({
        minX: -canvas.width / 2 / squareZoom + this.center.x,
        maxX: canvas.width / 2 / squareZoom + this.center.x,
        minY: -canvas.height / 2 / squareZoom + this.center.y,
        maxY: canvas.height / 2 / squareZoom + this.center.y,
      })
      .map(({ parcel }: IndexedParcel) => parcel)
      .map((points: any) =>
        toScreenCoordinates(
          { width: canvas.width, height: canvas.height },
          this.center,
          squareZoom,
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
    this.parcels.load(
      parcels.map((parcel: any) => ({ ...getEnvelope(parcel), parcel })),
    )
    this.hasUpdated = true
  }

  pan(screenDelta: Vector2) {
    const worldDelta = {
      x: screenDelta.x / this.zoomValue ** 2,
      y: screenDelta.y / this.zoomValue ** 2,
    }

    this.center = {
      x: this.center.x - worldDelta.x,
      y: this.center.y + worldDelta.y,
    }

    this.hasUpdated = true
  }

  zoom(delta: number) {
    this.zoomValue += delta / 32
    this.hasUpdated = true
  }
}

export default RenderEngine
