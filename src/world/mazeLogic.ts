import tileMap from '../utils/tileMap'
import { getRandomIndexFromArray } from './helpers'
import { createRoomOnDirection, roomsToPointMap } from './transformations'

export const enoughSpace = (
  level: PointMap,
  { coords, dir }: IUnitVector,
  roomToCheck = { height: 8, width: 7 },
) => {
  const { height, width } = roomToCheck
  const [x, y] = coords

  let startI
  let beforeI
  let startJ
  let beforeJ

  if (dir === 'up') {
    startI = x - Math.floor(width / 2)
    beforeI = x + Math.ceil(width / 2)
    startJ = y - height
    beforeJ = y
  } else if (dir === 'down') {
    startI = x - Math.floor(width / 2)
    beforeI = x + Math.ceil(width / 2)
    startJ = y + 1
    beforeJ = y + 1 + height
  } else if (dir === 'left') {
    startI = x - width
    beforeI = x
    startJ = y - Math.floor(height / 2)
    beforeJ = y + Math.ceil(height / 2)
  } else if (dir === 'right') {
    startI = x + 1
    beforeI = x + 1 + width
    startJ = y - Math.floor(height / 2)
    beforeJ = y + Math.ceil(height / 2)
  }

  for (let i = startI; i < beforeI; i++) {
    for (let j = startJ; j < beforeJ; j++) {
      if (level.get(JSON.stringify([i, j]))) {
        return false
      }
    }
  }
  return true
}

/**
 * Returns all the possible directions around a room wich are as a list of unit vectors
 * surrounding the rooom and pointing outwards.
 *
 * @param param0
 */
export const getPossibleDirections = ({ height, width, coords }: IRoom) => {
  const result: IUnitVector[] = []
  const [x, y] = coords

  for (let i = x; i < x + width; i++) {
    for (let j = y; j < y + height; j++) {
      if (i === x) {
        result.push({ dir: 'left', coords: [i, j] })
      }
      if (i === x + width - 1) {
        result.push({ dir: 'right', coords: [i, j] })
      }
      if (j === y) {
        result.push({ dir: 'up', coords: [i, j] })
      }
      if (j === y + (height - 1)) {
        result.push({ dir: 'down', coords: [i, j] })
      }
    }
  }
  return result
}

export const nextRoom = (
  level: IRoom[],
  appendTo: IRoom,
  nextRoomDims: IRoomDims,
) => {
  const room = _nextRoom(roomsToPointMap(level), appendTo, nextRoomDims)

  if (!room) {
    return null
  }
  const roomToAdd = createRoomOnDirection(room.dir, {
    width: room.width,
    height: room.height,
  })
  return roomToAdd
}

export const _nextRoom = (
  level: PointMap,
  appendTo: IRoom,
  nextRoomDims = { height: 4, width: 4 },
) => {
  const possibleDirs = getPossibleDirections(appendTo)
  while (possibleDirs.length) {
    const i = getRandomIndexFromArray(possibleDirs)
    const dir = possibleDirs[i]

    /**
     * Could use this for bigger space
     */

    // const biggerDims: IRoomDims = {
    //   height: nextRoomDims.height,
    //   width: nextRoomDims.width,
    // }

    const hasSpace = enoughSpace(level, dir, nextRoomDims)
    if (hasSpace) {
      return { dir, ...nextRoomDims }
    }
    possibleDirs.splice(i, 1)
  }
  return null
}

export const addBorder = (size: number) => (g: Grid) => {
  const border = new Array(size).fill(undefined)
  const result: any[] = []
  g.forEach(row => {
    const newRow = [...border, ...row, ...border]
    result.push(newRow)
  })
  const emptyRow = new Array(result[0].length).fill(undefined)
  const padding = new Array(size).fill(emptyRow)
  return [...padding, ...result, ...padding]
}

export const wrapLevel = (level: PointMap) => {
  const levelWithBorder = new Map()
  level.forEach((val, key) => levelWithBorder.set(key, val))

  level.forEach((_, key) => {
    const [x, y] = deserrializeKey(key)

    const coordUp = getRelativeCoords(key, 'up')
    const coordDown = getRelativeCoords(key, 'down')
    const coordLeft = getRelativeCoords(key, 'left')
    const coordRight = getRelativeCoords(key, 'right')
    const coordUpLeft = JSON.stringify([x - 1, y - 1])
    const coordUpRight = JSON.stringify([x + 1, y - 1])
    const coordDownLeft = JSON.stringify([x - 1, y + 1])
    const coordDownRight = JSON.stringify([x + 1, y + 1])

    /**
     * tricy
     */
    if (
      !levelWithBorder.get(coordLeft) &&
      !levelWithBorder.get(JSON.stringify([x - 2, y])) &&
      !levelWithBorder.get(coordUpLeft) &&
      levelWithBorder.get(coordDownLeft)
    ) {
      levelWithBorder.set(
        coordLeft,
        211,
        // tileMap.floor.blue.wall.corner.bottom.right[0],
      )
      // levelWithBorder.set(
      //   JSON.stringify([x - 2, y]),
      //   tileMap.floor.blue.wall.corner.bottom.right[0],
      // )
    }

    /**
     * standard cornders
     */
    if (!levelWithBorder.get(coordUp) && !levelWithBorder.get(coordLeft)) {
      levelWithBorder.set(coordUpLeft, tileMap.blue.wall.corner.top.left[0])
    }

    if (!levelWithBorder.get(coordUp) && !levelWithBorder.get(coordRight)) {
      levelWithBorder.set(coordUpRight, tileMap.blue.wall.corner.top.right[0])
    }

    if (!levelWithBorder.get(coordDown) && !levelWithBorder.get(coordLeft)) {
      levelWithBorder.set(
        coordDownLeft,
        tileMap.blue.wall.corner.bottom.left[0],
      )
    }

    if (!levelWithBorder.get(coordDown) && !levelWithBorder.get(coordRight)) {
      levelWithBorder.set(
        coordDownRight,
        tileMap.blue.wall.corner.bottom.right[0],
      )
    }

    // /**
    //  * Straightforward wallz
    //  */
    if (!levelWithBorder.get(coordUp)) {
      levelWithBorder.set(coordUp, tileMap.blue.wall.horizontal.clean[0])
    }

    if (!levelWithBorder.get(coordDown)) {
      levelWithBorder.set(coordDown, tileMap.blue.wall.horizontal.clean[0])
    }

    if (!levelWithBorder.get(coordLeft)) {
      levelWithBorder.set(coordLeft, tileMap.blue.wall.vertical.clean[0])
    }
    if (!levelWithBorder.get(coordRight)) {
      levelWithBorder.set(coordRight, tileMap.blue.wall.vertical.clean[0])
    }
  })
  return levelWithBorder
}

const deserrializeKey = (key: string): Point => JSON.parse(key)

const getRelativeCoords = (serializedKey: string, dir: Direction) => {
  const [x, y]: Point = deserrializeKey(serializedKey)
  if (dir === 'up') {
    return JSON.stringify([x, y - 1])
  }
  if (dir === 'down') {
    return JSON.stringify([x, y + 1])
  }
  if (dir === 'left') {
    return JSON.stringify([x - 1, y])
  }
  if (dir === 'right') {
    return JSON.stringify([x + 1, y])
  }
  return 'bar'
}
