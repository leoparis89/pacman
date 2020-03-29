import { flow } from 'lodash'
import { tileIdIsFloor } from '../../tiles/tilleUtils'
import tileMap from '../../tiles/tileMap'
import {
  cloneMap,
  makeDirUtils,
  makeIsEmpy,
  makeIsFloor,
} from './levelWrappingUtils'

export const handleCorners = wrappedLevel => (tileValue, key) => {
  const isEmpty = makeIsEmpy(wrappedLevel)
  if (!tileIdIsFloor(tileValue)) {
    return
  }
  const [x, y] = JSON.parse(key)

  const dirs = makeDirUtils([x, y])

  if (isEmpty(dirs.up) && isEmpty(dirs.left) && isEmpty(dirs.upLeft)) {
    wrappedLevel.set(
      JSON.stringify(dirs.upLeft),
      tileMap.blue.wall.corner.top.left[0],
    )
  }

  if (isEmpty(dirs.up) && isEmpty(dirs.right) && isEmpty(dirs.upRight)) {
    wrappedLevel.set(
      JSON.stringify(dirs.upRight),
      tileMap.blue.wall.corner.top.right[0],
    )
  }

  if (isEmpty(dirs.down) && isEmpty(dirs.right) && isEmpty(dirs.downRight)) {
    wrappedLevel.set(
      JSON.stringify(dirs.downRight),
      tileMap.blue.wall.corner.bottom.right[0],
    )
  }

  if (isEmpty(dirs.down) && isEmpty(dirs.left) && isEmpty(dirs.downLeft)) {
    wrappedLevel.set(
      JSON.stringify(dirs.downLeft),
      tileMap.blue.wall.corner.bottom.left[0],
    )
  }
}

export const handleTrivialWalls = (levelWithBorder: PointMap) => (
  tileValue,
  key,
) => {
  const isFree = makeIsEmpy(levelWithBorder)
  if (!tileIdIsFloor(tileValue)) {
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
}

export const handleEdgeCases = levelWithBorder => (tileValue, key) => {
  const pointIsFloor = makeIsFloor(levelWithBorder)
  if (!tileIdIsFloor(tileValue)) {
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
}

const handleSingle = (levelWithBorder: PointMap) => (tileValue, key) => {
  if (!tileIdIsFloor(tileValue)) {
    return
  }

  const isFree = makeIsEmpy(levelWithBorder)
  const isFloor = makeIsFloor(levelWithBorder)
  const [x, y] = JSON.parse(key)

  const dirs = makeDirUtils([x, y])

  if (
    isFree(dirs.right) &&
    isFloor(dirs.upRight) &&
    isFloor(dirs.downRight) &&
    isFloor([x + 2, y])
  ) {
    levelWithBorder.set(JSON.stringify(dirs.right), 50)
  }
}

const handleDeadEnds = (levelWithBorder: PointMap) => (tileValue, key) => {
  const [x, y] = JSON.parse(key)
  const dirs = makeDirUtils([x, y])
  // const isFree = makeIsEmpy(levelWithBorder)
  const isFloor = makeIsFloor(levelWithBorder)

  if (tileValue === tileMap.blue.wall.vertical.clean[0]) {
    if (isFloor(dirs.up)) {
      levelWithBorder.set(JSON.stringify([x, y]), 33)
    } else if (isFloor(dirs.down)) {
      levelWithBorder.set(JSON.stringify([x, y]), 50)
    }
    return
  }
  if (tileValue === tileMap.blue.wall.horizontal.clean[0]) {
    if (isFloor(dirs.left)) {
      levelWithBorder.set(JSON.stringify([x, y]), 18)
    } else if (isFloor(dirs.right)) {
      levelWithBorder.set(JSON.stringify([x, y]), 17)
    }
  }
}

export const makeWrapper = handleWrapping => level => {
  const levelWithBorder = cloneMap(level)
  levelWithBorder.forEach(handleWrapping(levelWithBorder))
  return levelWithBorder
}

const levelWrappers = [
  handleCorners,
  handleEdgeCases,
  handleSingle,
  handleTrivialWalls,
  handleDeadEnds,
].map(makeWrapper)

export const wrapLevel = (level: PointMap) => flow(...levelWrappers)(level)
