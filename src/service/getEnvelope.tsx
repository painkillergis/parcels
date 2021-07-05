import { Envelope, Parcel } from '../types'

export default function getEnvelope(parcel: Parcel): Envelope {
  const latitudes = parcel.points.map(({ latitude }) => latitude)
  const longitudes = parcel.points.map(({ longitude }) => longitude)
  return {
    minY: Math.min.apply(null, latitudes),
    maxY: Math.max.apply(null, latitudes),
    minX: Math.min.apply(null, longitudes),
    maxX: Math.max.apply(null, longitudes),
  }
}
