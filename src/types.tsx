export interface Box {
  width: number
  height: number
}

export interface Vector2 {
  x: number
  y: number
}

export interface Envelope {
  minY: number
  maxY: number
  minX: number
  maxX: number
}

export interface IndexedParcel extends Envelope {
  parcel: Parcel
}

export interface PagePosition {
  pageX: number
  pageY: number
}

export interface Container {
  parcels: Array<Parcel>
}

export interface Parcel {
  points: Array<LatLon>
  classifications: Array<string>
}

export interface LatLon {
  latitude: number
  longitude: number
}
