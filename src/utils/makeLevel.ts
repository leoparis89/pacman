import { flow } from 'lodash'
import {
  getRandomFromArray,
  paintGrid,
  pointMaptoGrid,
  shiftPointMapOutOfNegative,
} from './helpers'
import {
  createRoomOnDirection,
  getPossibleDirections,
  roomReducer,
} from './shapeGenerator'

export const makeLevel = () => {
  const firstRoom: IRoom = { height: 2, width: 2, coords: [0, 0] }
  const possibleDirs = getPossibleDirections(firstRoom)
  const dir = getRandomFromArray(possibleDirs)
  const secondRoom = createRoomOnDirection(dir, { height: 5, width: 5 })

  const level = flow(
    roomReducer,
    shiftPointMapOutOfNegative,
    pointMaptoGrid,
    paintGrid(292),
  )([firstRoom, secondRoom])

  return level
}
