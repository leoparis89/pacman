import tileMap from './tileMap'
import { getTileValules, isFloor } from './tilleUtils'

describe('ifFloor', () => {
  it('should return true if tile is a floor', () => {
    expect(isFloor(tileMap.blue.floor.broken[1])).toEqual(true)
  })

  it('should return floor if tile is a floor', () => {
    expect(isFloor(tileMap.blue.wall.horizontal[0])).toEqual(false)
  })
})

test('getTileValues should return the right value ', () => {
  expect(getTileValules(tileMap.blue.wall)).toEqual([
    2,
    36,
    37,
    32,
    4,
    35,
    48,
    51,
    0,
    3,
  ])
})
