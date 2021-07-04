import { Envelope } from '../types'

export default function getEnvelope(parcel: any): Envelope {
  const latitudes = parcel
    .getPointsList()
    .map((point: any) => point.getLatitude())
  const longitudes = parcel
    .getPointsList()
    .map((point: any) => point.getLongitude())
  return {
    minY: Math.min.apply(null, latitudes),
    maxY: Math.max.apply(null, latitudes),
    minX: Math.min.apply(null, longitudes),
    maxX: Math.max.apply(null, longitudes),
  }
}
