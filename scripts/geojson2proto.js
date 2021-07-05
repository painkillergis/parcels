require('google-protobuf')
const messages = require('../src/proto/parcels_pb')

const fs = require('fs')

function newParcels(parcels) {
  const instance = new messages.Parcels()
  instance.setParcelsList(parcels)
  return instance
}

function newParcel(points, classifications) {
  const instance = new messages.Parcels.Parcel()
  instance.setPointsList(points)
  instance.setClassificationsList(classifications)
  return instance
}

function newLatLon(latitude, longitude) {
  const instance = new messages.Parcels.Parcel.LatLon()
  instance.setLatitude(latitude)
  instance.setLongitude(longitude)
  return instance
}

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
