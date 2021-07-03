import { Envelope } from '../types'

export default function getEnvelope(lonlats: any): Envelope {
  const latitudes = lonlats.map(([lon, lat]: any) => lat)
  const longitudes = lonlats.map(([lon, lat]: any) => lon)
  return {
    minY: Math.min.apply(null, latitudes),
    maxY: Math.max.apply(null, latitudes),
    minX: Math.min.apply(null, longitudes),
    maxX: Math.max.apply(null, longitudes),
  }
}
