import { nextRoom } from './mazeLogic'
import { addRoomsToPointMap } from './transformations'

export const cookUpLevel = (
  seed: IRoom = { height: 9, width: 9, coords: [0, 0] },
  steps: number = 40,
): IRoom[] => {
  const result: IRoom[] = []

  result.push(seed)

  for (let i = 0; i < steps; i++) {
    // const level: PointMap = addRoomToPointMap(result)

    const curr = result[result.length - 1]

    const roomToAdd = nextRoom(result, curr)

    if (roomToAdd) {
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
