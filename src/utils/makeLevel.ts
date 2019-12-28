import { getPossibleDirections } from './shapeGenerator'

export const makeLevel = () => {
  const firstRoom: IRoom = { height: 2, width: 2, coords: [0, 0] }
  const possibleDirs = getPossibleDirections(firstRoom)
  debugger
}
