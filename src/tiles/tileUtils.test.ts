import tileMap from './tileMap'
import { isFloor } from './tilleUtils'

describe('ifFloor', () => {
  it('should return true if tile is a floor', () => {
    expect(isFloor(tileMap.blue.floor.broken[1])).toEqual(true)
  })

  it('should return floor if tile is a floor', () => {
    expect(isFloor(tileMap.blue.wall.horizontal[0])).toEqual(false)
  })
})
