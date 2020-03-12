import { flow } from 'lodash'
import {
  paintGrid,
  pointMaptoGrid,
  shiftPointMapOutOfNegative,
} from './helpers'
import { addRoomsToPointMap, nextRoom } from './mazeLogic'
import { createRoomOnDirection } from './transformations'

export const cookUpLevel = (
  seed: IRoom = { height: 2, width: 2, coords: [0, 0] },
  steps: number = 30,
): IRoom[] => {
  const result: IRoom[] = []

  result.push(seed)

  for (let i = 0; i < steps; i++) {
    // const level: PointMap = addRoomToPointMap(result)

    const curr = result[result.length - 1]

    const res = nextRoom(addRoomsToPointMap(result), curr)

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
