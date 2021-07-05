import { toScreenCoordinates } from './CoordinateTransformations'

test('offset by center', () => {
  expect(
    toScreenCoordinates(
      { width: 0, height: 0 },
      { x: -94.87038174907313, y: 46.90248960427145 },
      1,
      [[-94.87038174907313, 46.90248960427145]],
    ),
  ).toStrictEqual([[0, 0]])
})

test('offset by half of screen size', () => {
  expect(
    toScreenCoordinates({ width: 500, height: 1000 }, { x: 0, y: 0 }, 1, [
      [0, 0],
    ]),
  ).toStrictEqual([[250, 500]])
})

test('zoom', () => {
  expect(
    toScreenCoordinates({ width: 0, height: 0 }, { x: 0, y: 0 }, 250, [
      [1, -1],
    ]),
  ).toStrictEqual([[250, 250]])
})
