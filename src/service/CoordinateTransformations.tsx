import { Box, Vector2 } from '../types'

export function toScreenCoordinates(
  screenSize: Box,
  center: Vector2,
  zoom: number,
  feature: any,
) {
  return feature.map(([lon, lat]: any) => [
    (lon - center.x) * zoom + screenSize.width / 2,
    (-lat + center.y) * zoom + screenSize.height / 2,
  ])
}
