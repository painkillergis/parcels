import { toScreenCoordinates } from './service/CoordinateTransformations'
import getEnvelope from './service/getEnvelope'
import {
  Container,
  IndexedParcel,
  ProjectedParcel,
  Vector2,
} from './types'
const RBush = require('rbush')

const publicClassifications = [
  'CEMETERY-PUBLIC NON-HOMESTEAD',
  'COUNTY ADMINISTERED NON-HOMESTEAD',
  'FEDERAL PROPERTY NON-HOMESTEAD',
  'FOREST,PARK,WILDLIFE NON-HOMESTEAD',
  'STATE ACQUIRED NON-HOMESTEAD',
  'STATE ADMINISTERED NON-HOMESTEAD',
  'STATE PROPERTY NON-HOMESTEAD',
  'Tax Forfeit NON-HOMESTEAD',
]

class RenderEngine {
  center: Vector2 = { x: 357196.7, y: 5196129.9 }
  zoomValue: number = 4096
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

    const curvedZoom = this.getCurvedZoom()

    this.parcels
      .search({
        minX: -canvas.width / 2 / curvedZoom + this.center.x,
        maxX: canvas.width / 2 / curvedZoom + this.center.x,
        minY: -canvas.height / 2 / curvedZoom + this.center.y,
        maxY: canvas.height / 2 / curvedZoom + this.center.y,
      })
      .map(({ parcel }: IndexedParcel) => ({
        ...parcel,
        polygons: parcel.polygons.map((polygon) => ({
          points: toScreenCoordinates(
            { width: canvas.width, height: canvas.height },
            this.center,
            curvedZoom,
            polygon.points,
          ),
        })),
      }))
      .forEach(({ classifications, polygons }: ProjectedParcel) => {
        context.fillStyle =
          classifications.filter((classification: string) =>
            publicClassifications.includes(classification),
          ).length > 0
            ? '#AA4'
            : '#000'
        context.beginPath()
        polygons.forEach(({ points }) => {
          context.moveTo(points[0].x, points[0].y)
          points.slice(1, points.length).forEach(({ x, y }) => {
            context.lineTo(x, y)
          })
          context.closePath()
        })
        context.fill()
        context.stroke()
      })
  }

  setParcels(container: Container) {
    this.parcels.load(
      container.parcels.map((parcel) => ({
        ...getEnvelope(parcel),
        parcel,
      })),
    )
    this.hasUpdated = true
  }

  pan(screenDelta: Vector2) {
    const worldDelta = {
      x: screenDelta.x / this.getCurvedZoom(),
      y: screenDelta.y / this.getCurvedZoom(),
    }

    this.center = {
      x: this.center.x - worldDelta.x,
      y: this.center.y + worldDelta.y,
    }

    this.hasUpdated = true
  }

  zoom(delta: number) {
    this.zoomValue += delta
    this.hasUpdated = true
  }

  getCurvedZoom() {
    return (this.zoomValue / 8192) ** 2
  }

  onResize() {
    this.hasUpdated = true
  }

  query(screenPosition: Vector2) {
    const worldPosition: Vector2 = {
      x:
        (screenPosition.x - this.width / 2) / this.getCurvedZoom() +
        this.center.x,
      y:
        -(screenPosition.y - this.height / 2) / this.getCurvedZoom() +
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
