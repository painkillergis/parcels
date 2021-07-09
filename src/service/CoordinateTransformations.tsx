import { Box, Vector2 } from '../types'

export function toScreenCoordinates(
  screenSize: Box,
  center: Vector2,
  zoom: number,
  points: Array<Vector2>,
): Array<Vector2> {
  return points.map(({ x, y }) => ({
    x: (x - center.x) * zoom + screenSize.width / 2,
    y: (-y + center.y) * zoom + screenSize.height / 2,
  }))
}
