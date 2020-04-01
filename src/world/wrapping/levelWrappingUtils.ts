import {
  tileIdIsFloor,
  tileIdIsVertical,
  tileIdIsHorizontal,
} from '../../tiles/tilleUtils'

export const cloneMap = (map: Map<any, any>) => {
  const cloned = new Map()
  map.forEach((val, key) => cloned.set(key, val))
  return cloned
}
/**
 * Returns a function to check if a Point constains undefined
 * @param level
 */

const makeTileVerifier = verifier => (level: PointMap) => (
  coord: Point | Point[],
) => {
  const accessor = createAccessor(level)
  const cells = Array.isArray(coord)
    ? (coord as Point[]).map(e => accessor.get(e))
    : accessor.get(coord)
  return verifier(cells)
}

/**
 *
 * @param level
 */
const createAccessor = level => ({
  get: (coord: Point): number | undefined => level.get(JSON.stringify(coord)),
  set: (coord: Point, value: number) => level.set(JSON.stringify(coord), value),
})

/**
 * Returns a function to check if a point contains a floor tile index
 * @param level
 */

export const makeIsEmpy = (level: PointMap) => (coord: Point) =>
  level.get(JSON.stringify(coord)) === undefined

export const makeIsFloor = makeTileVerifier(tileIdIsFloor)

export const makeIsVertical = makeTileVerifier(tileIdIsVertical)

export const makeIsHorizontal = (level: PointMap) => (coord: Point) => {
  const cellValue = level.get(JSON.stringify(coord))
  return tileIdIsHorizontal(cellValue)
}
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
