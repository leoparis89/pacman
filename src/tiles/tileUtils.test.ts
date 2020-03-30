import tileMap from './tileMap'
import { tileIdIsFloor, getLeafs } from './tilleUtils'

describe('ifFloor', () => {
  it('should return true if tile is a floor', () => {
    expect(tileIdIsFloor(tileMap.blue.floor.broken[1])).toEqual(true)
  })

  it('should return floor if tile is a floor', () => {
    expect(tileIdIsFloor(tileMap.blue.wall.horizontal[0])).toEqual(false)
  })
})

test.skip('getTileValues should return the right value ', () => {
  expect(getLeafs(tileMap.blue.wall)).toEqual([
    2,
    36,
    37,
    32,
    4,
    35,
    50,
    33,
    18,
    17,
    48,
    51,
    0,
    3,
  ])
})

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
