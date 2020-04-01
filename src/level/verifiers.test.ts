import { roomsToPointMap } from '../world/transformations'
import { makeIsFloor } from './verifiers'
import { createLevelInstance } from './indext'
import { tileIdIsFloor } from '../tiles/tilleUtils'

describe('tileIsFloor verifier', () => {
  it('should return the right value ', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const levelMap = roomsToPointMap([room])

    const level = createLevelInstance(levelMap)

    expect(tileIdIsFloor(level.get([0, 0])!)).toEqual(true)

    // expect(makeIsFloor(levelMap)([1, 1])).toEqual(true)
  })
})
