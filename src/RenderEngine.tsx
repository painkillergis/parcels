import { toScreenCoordinates } from './service/CoordinateTransformations'
import getEnvelope from './service/getEnvelope'
import { IndexedParcel, Vector2 } from './types'
const RBush = require('rbush')

const publicClassifications = [
  'CEMETERY-PUBLIC NON-HOMESTEAD',
  'COUNTY ADMINISTERED NON-HOMESTEAD',
  'FEDERAL PROPERTY NON-HOMESTEAD',
  'FOREST,PARK,WILDLIFE NON-HOMESTEAD',
  'IN LIEU OF TAXES NON-HOMESTEAD',
  'In Lieu of Taxes NON-HOMESTEAD',
  'STATE ACQUIRED NON-HOMESTEAD',
  'STATE ADMINISTERED NON-HOMESTEAD',
  'STATE PROPERTY NON-HOMESTEAD',
  'Tax Forfeit NON-HOMESTEAD',
]

class RenderEngine {
  center: Vector2 = { x: -94.87038174907313, y: 46.90248960427145 }
  zoomValue: number = 128
  parcels: any = new RBush()
  hasUpdated: Boolean = false
  width: number = window.innerWidth
  height: number = window.innerHeight

  render(canvas: HTMLCanvasElement) {
    if (!this.hasUpdated) return
    this.hasUpdated = false

    this.width = canvas.width = window.innerWidth
    this.height = canvas.height = window.innerHeight

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
      .forEach((parcel: any) => {
        const points = toScreenCoordinates(
          { width: canvas.width, height: canvas.height },
          this.center,
          squareZoom,
          parcel.getPointsList(),
        )
        context.fillStyle =
          parcel
            .getClassificationsList()
            .filter((classification: string) =>
              publicClassifications.includes(classification),
            ).length > 0
            ? '#AA4'
            : '#000'
        context.moveTo(points[0].x, points[0].y)
        context.beginPath()
        points.slice(1, points.length).forEach(({ x, y }) => {
          context.lineTo(x, y)
        })
        context.closePath()
        context.fill()
        context.stroke()
      })
  }

  setParcels(container: any) {
    this.parcels.load(
      container
        .getParcelsList()
        .map((parcel: any) => ({ ...getEnvelope(parcel), parcel })),
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

  onResize() {
    this.hasUpdated = true
  }

  query(screenPosition: Vector2) {
    const worldPosition: Vector2 = {
      x:
        (screenPosition.x - this.width / 2) / this.zoomValue ** 2 +
        this.center.x,
      y:
        -(screenPosition.y - this.height / 2) / this.zoomValue ** 2 +
        this.center.y,
    }

    return this.parcels
      .search({
        minX: worldPosition.x,
        maxX: worldPosition.x,
        minY: worldPosition.y,
        maxY: worldPosition.y,
      })
      .map(({ parcel }: IndexedParcel) => parcel)
  }
}

export default RenderEngine
