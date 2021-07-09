import { Envelope, Parcel } from '../types'

export default function getEnvelope(parcel: Parcel): Envelope {
  const points = parcel.polygons.flatMap(({ points }) => points)
  const xs = points.map(({ x }) => x)
  const ys = points.map(({ y }) => y)
  return {
    minY: Math.min.apply(null, ys),
    maxY: Math.max.apply(null, ys),
    minX: Math.min.apply(null, xs),
    maxX: Math.max.apply(null, xs),
  }
}
