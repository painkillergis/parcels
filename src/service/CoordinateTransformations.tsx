import { Box, Vector2 } from '../types'

export function toScreenCoordinates(
  screenSize: Box,
  center: Vector2,
  zoom: number,
  pointsList: Array<any>,
): Array<Vector2> {
  return pointsList.map((point) => ({
    x: (point.getLongitude() - center.x) * zoom + screenSize.width / 2,
    y: (-point.getLatitude() + center.y) * zoom + screenSize.height / 2,
  }))
}
