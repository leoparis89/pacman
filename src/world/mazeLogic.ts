import { getRandomIndexFromArray } from './helpers'
import { roomToPointMap } from './transformations'

export const addRoomsToPointMap = (
  rs: IRoom[],
  level: PointMap = new Map(),
) => {
  const ps = rs.map(roomToPointMap)
  return _reducePointMap(ps, level)
}

const _reducePointMap = (ps: PointMap[], level: PointMap = new Map()) => {
  return ps.reduce((acc, curr) => {
    const levelWithNewRoom = new Map([...acc].concat([...curr]))
    return levelWithNewRoom
  }, level)
}

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
  level: PointMap,
  room: IRoom,
  nextRoomDims = { height: 4, width: 4 },
) => {
  const possibleDirs = getPossibleDirections(room)
  while (possibleDirs.length) {
    const i = getRandomIndexFromArray(possibleDirs)
    const dir = possibleDirs[i]
    const hasSpace = enoughSpace(level, dir, nextRoomDims)
    if (hasSpace) {
      return { dir, ...nextRoomDims }
    }
    possibleDirs.splice(i, 1)
  }
  return null
}
