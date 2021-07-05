const messages = require('./parcels_pb')

export interface Container {
  setParcelsList: (parcels: Parcels) => void
  getParcelsList: () => Parcels
}

export type Parcels = Array<Parcel>

export function newContainer(parcels: Parcels): Container {
  const instance = new messages.Parcels()
  instance.setParcelsList(parcels)
  return instance
}

export interface Parcel {
  setPointsList: (points: Points) => void
  getPointsList: () => Points
}

export type Points = Array<LatLon>

export function newParcel(
  points: Points,
  classifications: Array<string>,
): Parcel {
  const instance = new messages.Parcels.Parcel()
  instance.setPointsList(points)
  instance.setClassificationsList(classifications)
  return instance
}

export interface LatLon {
  setLatitude: (latitude: number) => void
  getLatitude: () => number
  setLongitude: (longitude: number) => void
  getLongitude: () => number
}

export function newLatLon(latitude: number, longitude: number): LatLon {
  const instance = new messages.Parcels.Parcel.LatLon()
  instance.setLatitude(latitude)
  instance.setLongitude(longitude)
  return instance
}
