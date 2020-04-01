import tileMap from './tileMap'
import {
  tileIdIsFloor,
  getLeafs,
  verifyPresence,
  tileIdisEmpty,
} from './tilleUtils'

describe('ifFloor', () => {
  it('should return true if tile is a floor', () => {
    expect(tileIdIsFloor(tileMap.blue.floor.broken[1])).toEqual(true)
  })

  // it('should return true if all tiles are a floor (case arg is array)', () => {
  //   expect(
  //     tileIdIsFloor([
  //       tileMap.blue.floor.broken[1],
  //       tileMap.blue.floor.clean[0],
  //     ] as PointContent[]),
  //   ).toEqual(true)
  // })

  it('should return false if tile is not a floor', () => {
    expect(tileIdIsFloor(tileMap.blue.wall.horizontal[0])).toEqual(false)
  })

  // it('should return false if not all tiles are a floor (case arg is array)', () => {
  //   expect(
  //     tileIdIsFloor([
  //       tileMap.blue.floor.broken[1],
  //       tileMap.blue.wall.horizontal.clean[0],
  //     ]),
  //   ).toEqual(false)
  // })
})

describe('isEmpty', () => {
  it('should return true if tile is undefined', () => {
    expect(tileIdisEmpty(undefined)).toEqual(true)
  })

  it('should return false if tile is not undefined', () => {
    expect(tileIdisEmpty(3)).toEqual(false)
  })
  // it('should return true if all tiles are undefined (case arg is array)', () => {
  //   expect(tileIdIsFloor([undefined, undefined])).toEqual(true)
  // })

  // it('should return true if all tiles are undefined (case arg is array)', () => {
  //   expect(tileIdIsFloor([undefined, undefined])).toEqual(true)
  // })

  // it('should return false if tile is not a floor', () => {
  //   expect(tileIdIsFloor(tileMap.blue.wall.horizontal[0])).toEqual(false)
  // })

  // it('should return false if not all tiles are a floor (case arg is array)', () => {
  //   expect(
  //     tileIdIsFloor([
  //       tileMap.blue.floor.broken[1],
  //       tileMap.blue.wall.horizontal.clean[0],
  //     ]),
  //   ).toEqual(false)
  // })
})
// test('verify presence should work with ingle value or array ', () => {
//   const data = [1, 2, 3, 4, 5]

//   expect(verifyPresence(3, data)).toEqual(true)
//   // expect(verifyPresence([3, 5], data)).toEqual(true)

//   // expect(verifyPresence([9, 11], data)).toEqual(false)
//   expect(verifyPresence(88, data)).toEqual(false)
// })

test('getLeafs should return the right value', () => {
  const input = {
    foo: {
      bar: [3, 4, 9],
      bob: {
        booz: [1, 7],
      },
    },
  }
  expect(getLeafs(input)).toEqual([3, 4, 9, 1, 7])
})
