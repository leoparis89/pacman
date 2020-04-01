import { roomsToPointMap } from '../world/transformations'
import { isFloor } from './verifiers'
// import { createLevelInstance } from './index'
import {} from '../tiles/tilleUtils'

describe.skip('tileIsFloor verifier', () => {
  it('should return true if tile is correct (case single value)', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const levelMap = roomsToPointMap([room])

    // expect(isFloor(levelMap)([0, 0])).toEqual(true)
  })

  //   it('should return true if all tiles are correct (case array)', () => {
  //     const room: IRoom = {
  //       coords: [0, 0],
  //       height: 4,
  //       width: 4,
  //       type: 'suite',
  //     }
  //     const levelMap = roomsToPointMap([room])

  //     expect(
  //       isFloor(levelMap)([
  //         [0, 0],
  //         [0, 1],
  //         [0, 2],
  //         [1, 2],
  //       ]),
  //     ).toEqual(true)
  //   })

  //   it('should return false if a tile is incorrect (case array)', () => {
  //     const room: IRoom = {
  //       coords: [0, 0],
  //       height: 4,
  //       width: 4,
  //       type: 'suite',
  //     }
  //     const levelMap = roomsToPointMap([room])

  //     expect(
  //       isFloor(levelMap)([
  //         [0, 0],
  //         [9, 0],
  //         [0, 2],
  //         [1, 2],
  //       ]),
  //     ).toEqual(false)
  //   })

  it('should return false if tile is not correct (case single value)', () => {
    const room: IRoom = {
      coords: [0, 0],
      height: 4,
      width: 4,
      type: 'suite',
    }
    const levelMap = roomsToPointMap([room])

    // expect(isFloor(levelMap)([9, 0])).toEqual(false)
  })

  //   it('should return false if tile is not correct (case single value)', () => {
  //     const room: IRoom = {
  //       coords: [0, 0],
  //       height: 4,
  //       width: 4,
  //       type: 'suite',
  //     }
  //     const levelMap = roomsToPointMap([room])

  //     const level = createLevelInstance(levelMap)

  //     expect(tileIdIsFloor(level.get([8, 0]))).toEqual(false)
  //     // expect(makeIsFloor(levelMap)([1, 1])).toEqual(true)
  //   })

  //   it('should return true if all tiles are correct (case array)', () => {
  //     const room: IRoom = {
  //       coords: [0, 0],
  //       height: 4,
  //       width: 4,
  //       type: 'suite',
  //     }
  //     const levelMap = roomsToPointMap([room])

  //     const level = createLevelInstance(levelMap)

  //     // expect(tileIdIsFloor([level.get([0, 0])])).toEqual(true)
  //     // expect(makeIsFloor(levelMap)([1, 1])).toEqual(true)
  //   })
})
