import { newLatLon } from '../proto/parcels'
import { toScreenCoordinates } from './CoordinateTransformations'

test('offset by center', () => {
  expect(
    toScreenCoordinates(
      { width: 0, height: 0 },
      { x: -94.87038174907313, y: 46.90248960427145 },
      1,
      [newLatLon(46.90248960427145, -94.87038174907313)],
    ),
  ).toStrictEqual([newLatLon(0, 0)])
})

test('offset by half of screen size', () => {
  expect(
    toScreenCoordinates({ width: 500, height: 1000 }, { x: 0, y: 0 }, 1, [
      newLatLon(0, 0),
    ]),
  ).toStrictEqual([newLatLon(500, 250)])
})

test('zoom', () => {
  expect(
    toScreenCoordinates({ width: 0, height: 0 }, { x: 0, y: 0 }, 250, [
      newLatLon(-1, 1),
    ]),
  ).toStrictEqual([newLatLon(250, 250)])
})
