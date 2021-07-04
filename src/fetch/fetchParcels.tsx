import 'google-protobuf'
const { Parcels } = require('../proto/parcels_pb')

function fetchParcels(): any | undefined {
  return fetch('/parcels.v2.pbf')
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) =>
      Parcels.deserializeBinary(new Uint8Array(arrayBuffer)),
    )
}

export default fetchParcels
