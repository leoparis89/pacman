import { flow } from 'lodash'
import { isFloor } from '../../tiles/tilleUtils'
import tileMap from '../../tiles/tileMap'
import {
  cloneMap,
  makeDirUtils,
  makeIsEmpy,
  makeIsFloor,
} from './levelWrappingUtils'

export const wrapLevel = (level: PointMap) =>
  flow(wrapCorners, wrapEgedCases, wrapTrivialWalls)(level)

export const wrapCorners = (level: PointMap) => {
  // Clone fresh new level: levelWithBorder !
  const levelWithBorder = cloneMap(level)

  const isFree = makeIsEmpy(level)
  level.forEach((tileValue, key) => {
    if (!isFloor(tileValue)) {
      return
    }
    const [x, y] = JSON.parse(key)

    const dirs = makeDirUtils([x, y])

    if (isFree(dirs.up) && isFree(dirs.left) && isFree(dirs.upLeft)) {
      levelWithBorder.set(
        JSON.stringify(dirs.upLeft),
        tileMap.blue.wall.corner.top.left[0],
      )
    }

    if (isFree(dirs.up) && isFree(dirs.right) && isFree(dirs.upRight)) {
      levelWithBorder.set(
        JSON.stringify(dirs.upRight),
        tileMap.blue.wall.corner.top.right[0],
      )
    }

    if (isFree(dirs.down) && isFree(dirs.right) && isFree(dirs.downRight)) {
      levelWithBorder.set(
        JSON.stringify(dirs.downRight),
        tileMap.blue.wall.corner.bottom.right[0],
      )
    }

    if (isFree(dirs.down) && isFree(dirs.left) && isFree(dirs.downLeft)) {
      levelWithBorder.set(
        JSON.stringify(dirs.downLeft),
        tileMap.blue.wall.corner.bottom.left[0],
      )
    }
  })
  return levelWithBorder
}
export const wrapTrivialWalls = (level: PointMap) => {
  // Clone fresh new level: levelWithBorder !
  const levelWithBorder = cloneMap(level)
  const isFree = makeIsEmpy(levelWithBorder)

  level.forEach((tileValue, key) => {
    if (!isFloor(tileValue)) {
      return
    }
    const [x, y] = JSON.parse(key)

    const dirs = makeDirUtils([x, y])

    if (isFree(dirs.up)) {
      levelWithBorder.set(
        JSON.stringify(dirs.up),
        tileMap.blue.wall.horizontal.clean[0],
      )
    }
    if (isFree(dirs.down)) {
      levelWithBorder.set(
        JSON.stringify(dirs.down),
        tileMap.blue.wall.horizontal.clean[0],
      )
    }
    if (isFree(dirs.left)) {
      levelWithBorder.set(
        JSON.stringify(dirs.left),
        tileMap.blue.wall.vertical.clean[0],
      )
    }
    if (isFree(dirs.right)) {
      levelWithBorder.set(
        JSON.stringify(dirs.right),
        tileMap.blue.wall.vertical.clean[0],
      )
    }
  })
  return levelWithBorder
}

export const wrapEgedCases = (level: PointMap) => {
  // Clone fresh new level: levelWithBorder !
  const levelWithBorder = cloneMap(level)
  const pointIsFloor = makeIsFloor(levelWithBorder)

  level.forEach((tileValue, key) => {
    if (!isFloor(tileValue)) {
      return
    }
    const [x, y] = JSON.parse(key)
    const dirs = makeDirUtils([x, y])

    /**
     *
     *  C?
     *  xx
     */
    if (
      !pointIsFloor(dirs.right) &&
      !pointIsFloor([x + 2, y]) &&
      !pointIsFloor(dirs.upRight) &&
      pointIsFloor(dirs.downRight)
    ) {
      // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
      levelWithBorder.set(
        JSON.stringify(dirs.right),
        tileMap.blue.wall.corner.bottom.left,
      )
    }

    /**
     *
     *  ?C
     *  xx
     */
    if (
      !pointIsFloor(dirs.left) &&
      !pointIsFloor([x - 2, y]) &&
      !pointIsFloor(dirs.upLeft) &&
      pointIsFloor(dirs.downLeft)
    ) {
      // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
      levelWithBorder.set(
        JSON.stringify(dirs.left),
        tileMap.blue.wall.corner.bottom.right,
      )
    }
    /**
     *
     *  xx
     *  ?C
     */
    if (
      !pointIsFloor(dirs.left) &&
      !pointIsFloor([x - 2, y]) &&
      !pointIsFloor(dirs.downLeft) &&
      pointIsFloor(dirs.upLeft)
    ) {
      // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
      levelWithBorder.set(
        JSON.stringify(dirs.left),
        tileMap.blue.wall.corner.top.right,
      )
    }
    /**
     *
     *  xx
     *  C?
     */
    if (
      !pointIsFloor(dirs.right) &&
      !pointIsFloor([x + 2, y]) &&
      !pointIsFloor(dirs.downRight) &&
      pointIsFloor(dirs.upRight)
    ) {
      // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
      levelWithBorder.set(
        JSON.stringify(dirs.right),
        tileMap.blue.wall.corner.top.left,
      )
    }
    /**
     *   ?C
     *   xx
     */
    // if (
    //   isFree(dirs.left) &&
    //   isFree([x - 2, y]) &&
    //   isFree(dirs.upLeft) &&
    //   !isFree(dirs.downLeft)
    // ) {
    //   levelWithBorder.set(
    //     JSON.stringify(dirs.left),
    //     tileMap.blue.wall.corner.bottom.right,
    //   )
    // }

    // /**
    //  *   xx
    //  *   C?
    //  */
    // if (
    //   isFree(dirs.right) &&
    //   isFree([x + 2, y]) &&
    //   isFree(dirs.downRight) &&
    //   !isFree(dirs.upRight)
    // ) {
    //   levelWithBorder.set(
    //     JSON.stringify(dirs.right),
    //     tileMap.blue.wall.corner.bottom.right,
    //   )
    // }
  })
  return levelWithBorder
}
