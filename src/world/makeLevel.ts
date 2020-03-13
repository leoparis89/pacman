import { flow } from 'lodash'
import { paintGrid, shiftPointMapOutOfNegative } from './helpers'
import { _nextRoom, nextRoom } from './mazeLogic'
import { addRoomsToPointMap, createRoomOnDirection } from './transformations'

export const cookUpLevel = (
  seed: IRoom = { height: 9, width: 9, coords: [0, 0] },
  steps: number = 40,
): IRoom[] => {
  const result: IRoom[] = []

  result.push(seed)

  for (let i = 0; i < steps; i++) {
    // const level: PointMap = addRoomToPointMap(result)

    const curr = result[result.length - 1]

    const res = nextRoom(result, curr)

    if (res) {
      const roomToAdd = createRoomOnDirection(res.dir, {
        width: res.width,
        height: res.width,
      })
      result.push(roomToAdd)
    }
  }
  return result
}

export const makeLevel = () => {
  const rooms = cookUpLevel()

  const level = addRoomsToPointMap(rooms)
  // shiftPointMapOutOfNegative,
  // pointMaptoGrid,
  // paintGrid(292),

  return level
}
