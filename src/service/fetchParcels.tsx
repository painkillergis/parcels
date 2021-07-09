import 'google-protobuf'
import { Container } from '../types'
const { Parcels } = require('../proto/parcels_pb')

function pbf2domain(containerPbf: any): Container {
  return {
    parcels: containerPbf.getParcelsList().map((parcel: any) => ({
      classifications: parcel.getClassificationsList(),
      polygons: parcel.getPolygonsList().map((polygon: any) => ({
        points: polygon.getPointsList().map((point: any) => ({
          x: point.getLongitude(),
          y: point.getLatitude(),
        })),
      })),
    })),
  }
}

function fetchParcels(): Promise<Container> {
  return fetch('/parcels.v5.pbf')
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) =>
      pbf2domain(Parcels.deserializeBinary(new Uint8Array(arrayBuffer))),
    )
}

export default fetchParcels
