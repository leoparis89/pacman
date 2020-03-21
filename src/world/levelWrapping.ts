import { flow } from 'lodash'
import { isFloor } from '../utils/tileCheckers'
import tileMap from '../utils/tileMap'
import { cloneMap, makeDirUtils, makeIsFree } from './levelWrappingUtils'

export const wrapLevel = (level: PointMap) => {
  return flow(wrapEgedCases, wrapTrivialWalls)(level)
}
export const addEdgeCaseCorners = (level: PointMap) => {}

export const wrapTrivialWalls = (level: PointMap) => {
  // Clone fresh new level: levelWithBorder !
  const levelWithBorder = cloneMap(level)
  const isFree = makeIsFree(levelWithBorder)

  level.forEach((tileValue, key) => {
    if (!isFloor(tileValue)) {
      return
    }
    const [x, y] = JSON.parse(key)

    const dirs = makeDirUtils([x, y])

    if (isFree(dirs.up)) {
      // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
      levelWithBorder.set(
        JSON.stringify(dirs.up),
        tileMap.blue.wall.horizontal.clean,
      )
    }
  })
  return levelWithBorder
}

export const wrapEgedCases = (level: PointMap) => {
  // Clone fresh new level: levelWithBorder !
  const levelWithBorder = cloneMap(level)
  const isFree = makeIsFree(levelWithBorder)

  level.forEach((_, key) => {
    const [x, y] = JSON.parse(key)

    const dirs = makeDirUtils([x, y])

    /**
     *
     *  C?
     *  xx
     */
    if (
      isFree(dirs.right) &&
      isFree([x + 2, y]) &&
      isFree(dirs.upRight) &&
      !isFree(dirs.downRight)
    ) {
      // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
      levelWithBorder.set(
        JSON.stringify(dirs.right),
        tileMap.blue.wall.corner.bottom.left,
      )
    }

    /**
     *   ?C
     *   xx
     */
    if (
      isFree(dirs.left) &&
      isFree([x - 2, y]) &&
      isFree(dirs.upLeft) &&
      !isFree(dirs.downLeft)
    ) {
      levelWithBorder.set(
        JSON.stringify(dirs.left),
        tileMap.blue.wall.corner.bottom.right,
      )
    }
  })
  return levelWithBorder
}
