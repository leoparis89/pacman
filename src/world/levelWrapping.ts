import { isFloor } from '../utils/tileCheckers'
import tileMap from '../utils/tileMap'

export const addEdgeCaseCorners = (level: PointMap) => {}

export const wrapLevel = (level: PointMap) => {
  // Clone fresh new level: levelWithBorder !
  const levelWithBorder = cloneMap(level)
  const isFree = makeIsFree(levelWithBorder)

  level.forEach((_, key) => {
    const [x, y] = deserrializeKey(key)

    const {
      left,
      right,
      up,
      down,
      downLeft,
      downRight,
      upLeft,
      upRight,
    } = makeDirUtils([x, y])
    // const coordUp = getRelativeCoords(key, 'up')
    // const coordDown = getRelativeCoords(key, 'down')
    // const coordLeft = getRelativeCoords(key, 'left')
    // const coordRight = getRelativeCoords(key, 'right')
    // const coordUpLeft = JSON.stringify([x - 1, y - 1])
    // const coordUpRight = JSON.stringify([x + 1, y - 1])
    // const coordDownLeft = JSON.stringify([x - 1, y + 1])
    // const coordDownRight = JSON.stringify([x + 1, y + 1])

    // Left wall
    // if (isFree(coordLeft)) {
    //   levelWithBorder.set(coordLeft, tileMap.blue.wall.vertical.clean[0])
    // }

    // if (!levelWithBorder.get(coordRight)) {
    //   levelWithBorder.set(coordRight, tileMap.blue.wall.vertical.clean[0])
    // }
    /**
     * ?x
     * xx
     */
    // if (isFree(coordLeft) && !isFree(coordDownLeft)) {
    //   levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.right)
    // }

    /**
     *
     *  C?
     *  xx
     */
    if (
      isFree(right) &&
      isFree([x + 2, y]) &&
      isFree(upRight) &&
      !isFree(downRight)
    ) {
      // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
      levelWithBorder.set(
        JSON.stringify(right),
        tileMap.blue.wall.corner.bottom.left,
      )
    }

    /**
     *   ?C
     *   xx
     */
    if (
      isFree(left) &&
      isFree([x - 2, y]) &&
      isFree(upLeft) &&
      !isFree(downLeft)
    ) {
      // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
      levelWithBorder.set(
        JSON.stringify(left),
        tileMap.blue.wall.corner.bottom.right,
      )
    }

    if (isFree(up)) {
      levelWithBorder.set(
        JSON.stringify(up),
        tileMap.blue.wall.horizontal.clean[0],
      )
    }
    // /**
    //  *
    //  *   xx
    //  *   ?C
    //  *
    //  */
    // if (
    //   isFree(left) &&
    //   isFree([x - 2, y]) &&
    //   isFree(downLeft) &&
    //   !isFree(upLeft)
    // ) {
    //   // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
    //   levelWithBorder.set(
    //     JSON.stringify(left),
    //     tileMap.blue.wall.corner.top.right,
    //   )
    // }
    // /**
    //  *
    //  *   xx
    //  *   C?
    //  *
    //  */
    // if (
    //   isFree(right) &&
    //   isFree([x + 2, y]) &&
    //   isFree(downRight) &&
    //   !isFree(upRight)
    // ) {
    //   // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
    //   levelWithBorder.set(
    //     JSON.stringify(right),
    //     tileMap.blue.wall.corner.top.left,
    //   )
    // }

    /**
     *
     *  xx
     *  x?
     */
    // if (isFree(coordRight) && !isFree(coordUpRight)) {
    //   // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
    //   levelWithBorder.set(coordRight, tileMap.blue.wall.corner.top.left)
    // }
    /**
     * standard cornders
     */
    // if (isFree(coordUp) && isFree(coordLeft)) {
    //   levelWithBorder.set(coordUpLeft, tileMap.blue.wall.corner.top.left)
    // }

    // if (isFree(coordUp) && isFree(coordRight)) {
    //   levelWithBorder.set(coordUpRight, tileMap.blue.wall.corner.top.right)
    // }

    // if (isFree(coordDown) && isFree(coordLeft)) {
    //   levelWithBorder.set(coordDownLeft, tileMap.blue.wall.corner.bottom.left)
    // }

    // if (isFree(coordDown) && isFree(coordRight)) {
    //   levelWithBorder.set(coordDownRight, tileMap.blue.wall.corner.bottom.right)
    // }
    // if (!levelWithBorder.get(coordDown) && !levelWithBorder.get(coordLeft)) {
    //   levelWithBorder.set(
    //     coordDownLeft,
    //     tileMap.blue.wall.corner.bottom.left[0],
    //   )
    // }

    // if (!levelWithBorder.get(coordDown) && !levelWithBorder.get(coordRight)) {
    //   levelWithBorder.set(
    //     coordDownRight,
    //     tileMap.blue.wall.corner.bottom.right[0],
    //   )
    // }

    // /**
    //  * Straightforward wallz
    //  */
  })
  return levelWithBorder
}

const deserrializeKey = (key: string): Point => JSON.parse(key)

const cloneMap = (map: Map<any, any>) => {
  const cloned = new Map()
  map.forEach((val, key) => cloned.set(key, val))
  return cloned
}

export const makeIsFree = (level: PointMap) => (coord: Point) =>
  !isFloor(level.get(JSON.stringify(coord)))

const makeDirUtils = ([x, y]: Point): { [index: string]: Point } => {
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
