import { flow } from 'lodash'
import {
  getRandomElFromArray,
  getRandomIndexFromArray,
  paintGrid,
  pointMaptoGrid,
  shiftPointMapOutOfNegative,
} from './helpers'
import {
  createRoomOnDirection,
  getPossibleDirections,
  nextRoom,
  roomReducer,
} from './shapeGenerator'

export const cookUpLevel = (
  seed: IRoom = { height: 2, width: 2, coords: [0, 0] },
  steps: number = 5,
): IRoom[] => {
  const result: IRoom[] = []

  result.push(seed)

  for (let i = 0; i < steps; i++) {
    const level: PointMap = roomReducer(result)

    const curr = result[result.length - 1]

    const res = nextRoom(level, curr)

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
  const firstRoom: IRoom = { height: 2, width: 2, coords: [0, 0] }
  const possibleDirs = getPossibleDirections(firstRoom)
  const dir = getRandomElFromArray(possibleDirs)
  const secondRoom = createRoomOnDirection(dir, { height: 5, width: 5 })

  const level = flow(
    roomReducer,
    shiftPointMapOutOfNegative,
    pointMaptoGrid,
    paintGrid(292),
  )([firstRoom, secondRoom])

  return level
}
