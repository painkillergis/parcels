require('google-protobuf')
const messages = require('../src/proto/parcels_pb')

const fs = require('fs')

function newParcels(parcels) {
  const instance = new messages.Parcels()
  instance.setParcelsList(parcels)
  return instance
}

function newParcel(classifications, polygons) {
  const instance = new messages.Parcels.Parcel()
  instance.setClassificationsList(classifications)
  instance.setPolygonsList(polygons)
  return instance
}

function newPolygon(points) {
  const instance = new messages.Parcels.Parcel.Polygon()
  instance.setPointsList(points)
  return instance
}

function newLatLon(latitude, longitude) {
  const instance = new messages.Parcels.Parcel.Polygon.LatLon()
  instance.setLatitude(latitude)
  instance.setLongitude(longitude)
  return instance
}

const featureCollection = JSON.parse(fs.readFileSync('/dev/stdin'))
const parcels = newParcels(
  featureCollection.features.map((feature) =>
    newParcel(
      [
        feature.properties.Class1,
        feature.properties.Class2,
        feature.properties.Class3,
      ].filter((classification) => !!classification),
      feature.geometry.coordinates.flatMap((polygons) =>
        polygons.map((polygon) =>
          newPolygon(polygon.map(([lon, lat]) => newLatLon(lat, lon))),
        ),
      ),
    ),
  ),
)

process.stdout.write(parcels.serializeBinary())
