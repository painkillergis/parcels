import { toScreenCoordinates } from './CoordinateTransformations'

test('offset by center', () => {
  expect(
    toScreenCoordinates(
      { width: 0, height: 0 },
      { x: -94.87038174907313, y: 46.90248960427145 },
      1,
      [{ x: -94.87038174907313, y: 46.90248960427145 }],
    ),
  ).toStrictEqual([{ x: 0, y: 0 }])
})

test('offset by half of screen size', () => {
  expect(
    toScreenCoordinates({ width: 500, height: 1000 }, { x: 0, y: 0 }, 1, [
      { x: 0, y: 0 },
    ]),
  ).toStrictEqual([{ x: 250, y: 500 }])
})

test('zoom', () => {
  expect(
    toScreenCoordinates({ width: 0, height: 0 }, { x: 0, y: 0 }, 250, [
      { x: 1, y: -1 },
    ]),
  ).toStrictEqual([{ x: 250, y: 250 }])
})
