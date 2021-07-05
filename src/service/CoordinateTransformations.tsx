import { Box, Vector2 } from '../types'
import { newLatLon, Points } from '../proto/parcels'

export function toScreenCoordinates(
  screenSize: Box,
  center: Vector2,
  zoom: number,
  points: Points,
): Points {
  return points.map((point) =>
    newLatLon(
      (-point.getLatitude() + center.y) * zoom + screenSize.height / 2,
      (point.getLongitude() - center.x) * zoom + screenSize.width / 2,
    ),
  )
}
