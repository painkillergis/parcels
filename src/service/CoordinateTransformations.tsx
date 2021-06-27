import { Box, Vector2 } from '../types'

export function toScreenCoordinates(
  screenSize: Box,
  center: Vector2,
  zoom: number,
  feature: any,
) {
  return {
    ...feature,
    geometry: {
      ...feature.geometry,
      coordinates: feature.geometry.coordinates.map(
        (polygons: Array<Array<Array<any>>>) =>
          polygons.map((polygon) =>
            polygon.map(([lon, lat]) => [
              (lon - center.x) * zoom + screenSize.width / 2,
              (-lat + center.y) * zoom + screenSize.height / 2,
            ]),
          ),
      ),
    },
  }
}
