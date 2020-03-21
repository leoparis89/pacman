import { isFloor } from '../../utils/tileCheckers'

export const cloneMap = (map: Map<any, any>) => {
  const cloned = new Map()
  map.forEach((val, key) => cloned.set(key, val))
  return cloned
}
export const makeIsEmpy = (level: PointMap) => (coord: Point) =>
  level.get(JSON.stringify(coord)) === undefined

export const makeIsFloor = (level: PointMap) => (coord: Point) =>
  isFloor(level.get(JSON.stringify(coord)))

export const makeDirUtils = ([x, y]: Point): {
  [index: string]: Point
} => {
  return {
    up: [x, y - 1],
    down: [x, y + 1],
    left: [x - 1, y],
    right: [x + 1, y],
    upLeft: [x - 1, y - 1],
    upRight: [x + 1, y - 1],
    downLeft: [x - 1, y + 1],
    downRight: [x + 1, y + 1],
  }
}
