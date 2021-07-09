import { polygonContains as polygonContainsD3 } from 'd3-polygon'
import { Parcel, Vector2 } from '../types'

export default function polygonContains(parcel: Parcel, query: Vector2) {
  const queryD3: [number, number] = [query.x, query.y]
  const polygonsD3 = parcel.polygons.map(({ points }) =>
    points.map(({ x, y }) => [x, y] as [number, number]),
  )
  return (
    polygonContainsD3(polygonsD3[0], queryD3) &&
    polygonsD3.every(
      (points, i) => i < 1 || !polygonContainsD3(points, queryD3),
    )
  )
}
