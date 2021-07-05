import 'google-protobuf'
import { Container } from '../types'
const { Parcels } = require('../proto/parcels_pb')

function fetchParcels(): Promise<Container> {
  return fetch('/parcels.v2.pbf')
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      const containerPbf = Parcels.deserializeBinary(
        new Uint8Array(arrayBuffer),
      )
      return {
        parcels: containerPbf.getParcelsList().map((parcel: any) => ({
          points: parcel.getPointsList().map((point: any) => ({
            latitude: point.getLatitude(),
            longitude: point.getLongitude(),
          })),
          classifications: parcel.getClassificationsList(),
        })),
      }
    })
}

export default fetchParcels
