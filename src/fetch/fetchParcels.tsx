import 'google-protobuf'
const { Parcels } = require('../proto/parcels_pb')

function fetchParcels(): any | undefined {
  return fetch('/parcels.pbf')
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) =>
      Parcels.deserializeBinary(new Uint8Array(arrayBuffer)),
    )
    .then((container) =>
      container
        .getParcelsList()
        .map((parcel: any) =>
          parcel
            .getPointsList()
            .map((point: any) => [
              point.getLongitude(),
              point.getLatitude(),
            ]),
        ),
    )
}

export default fetchParcels
