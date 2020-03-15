import { nextRoom } from './mazeLogic'
import { roomsToPointMap } from './transformations'

export const cookUpLevel = (
  seed: IRoom = { height: 9, width: 9, coords: [0, 0] },
  steps: number = 100,
): IRoom[] => {
  const result: IRoom[] = []

  result.push(seed)

  let backTrack = 0

  for (let i = 0; i < steps; i++) {
    const curr = result[result.length - 1 - backTrack]

    const nextRoomDetails = getNextRoomDetails()

    const roomToAdd = nextRoom(result, curr, nextRoomDetails.dims)

    if (roomToAdd) {
      backTrack = 0
      roomToAdd.type = nextRoomDetails.type
      result.push(roomToAdd)
    } else {
      backTrack++
      steps++
    }
  }
  console.log(result.length)
  return result
}

export const makeLevel = () => {
  const rooms = cookUpLevel()

  const level = roomsToPointMap(rooms)
  // shiftPointMapOutOfNegative,
  // pointMaptoGrid,
  // paintGrid(292),

  return level
}

export const getNextRoomDetails = (): {
  type: RoomType
  dims: IRoomDims
} => {
  const chance = Math.random() * 100
  if (chance > 90) {
    return { dims: { height: 8, width: 10 }, type: 'suite' }
  }
  return { dims: { height: 4, width: 4 }, type: 'coridoor' }
}
