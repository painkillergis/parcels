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
  parcel: any
}
