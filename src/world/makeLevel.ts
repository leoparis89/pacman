import { wrapLevel } from './wrapping'
import { nextRoom } from './mazeLogic'
import { roomsToPointMap } from './transformations'

export const cookUpLevel = (
  seed: IRoom = {
    type: 'suite',
    height: 9,
    width: 9,
    coords: [0, 0],
  },
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
  return result
}

export const makeLevel = () => {
  const rooms = require('../mocks/mockRooms') || cookUpLevel()
  const level = roomsToPointMap(rooms)
  return wrapLevel(level)
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
