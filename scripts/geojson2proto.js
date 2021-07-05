require('google-protobuf')

const {
  newParcels,
  newParcel,
  newLatLon,
} = require('../src/proto/parcels')
const fs = require('fs')

const featureCollection = JSON.parse(fs.readFileSync('/dev/stdin'))
const parcels = newParcels(
  featureCollection.features.map((feature) =>
    newParcel(
      feature.geometry.coordinates.flatMap((polygons) =>
        polygons.flatMap((polygon) =>
          polygon.map(([lon, lat]) => newLatLon(lat, lon)),
        ),
      ),
      [
        feature.properties.Class1,
        feature.properties.Class2,
        feature.properties.Class3,
      ].filter((classification) => !!classification),
    ),
  ),
)

process.stdout.write(parcels.serializeBinary())
