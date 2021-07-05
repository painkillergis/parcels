import { Box, LatLon, Vector2 } from '../types'

export function toScreenCoordinates(
  screenSize: Box,
  center: Vector2,
  zoom: number,
  points: Array<LatLon>,
): Array<Vector2> {
  return points.map(({ latitude, longitude }) => ({
    x: (longitude - center.x) * zoom + screenSize.width / 2,
    y: (-latitude + center.y) * zoom + screenSize.height / 2,
  }))
}
