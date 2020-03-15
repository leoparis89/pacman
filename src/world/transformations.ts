import tileMap from '../utils/tileMap'
import { normalizeArray } from './helpers'

/**
 *
 * @param room
 */
export const roomToPointMap = (room: IRoom) => {
  const { height, width, coords } = room
  const [x, y] = coords
  const result: PointMap = new Map()

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      result.set(JSON.stringify([i + x, j + y]), getTile(room.type))
    }
  }
  return result
}

export const getTile = (type?: RoomType) => {
  const random = Math.random() * 100
  if (type === 'suite') {
    return tileMap.floor.blue.tile[0]
  }
  if (type === 'coridoor') {
    if (random > 50) {
      return tileMap.floor.blue.clean[0]
    }
    return tileMap.floor.blue.clean[1]
  }
  return true
}
export const createRoomOnDirection = (
  { dir, coords }: IUnitVector,
  { height, width },
): IRoom => {
  const [x, y] = coords

  if (dir === 'up') {
    return {
      coords: [x - Math.floor(width / 2), y - height],
      height,
      width,
    }
  }

  if (dir === 'down') {
    return {
      coords: [x - Math.floor(width / 2), y + 1],
      height,
      width,
    }
  }

  if (dir === 'left') {
    return {
      coords: [x - width, y - Math.floor(height / 2)],
      height,
      width,
    }
  }

  // right case
  return {
    coords: [x + 1, y - Math.floor(height / 2)],
    height,
    width,
  }
}

export const roomsToPointMap = (rs: IRoom[], level: PointMap = new Map()) => {
  const ps = rs.map(roomToPointMap)
  return _reducePointMap(ps, level)
}

const _reducePointMap = (ps: PointMap[], level: PointMap = new Map()) => {
  return ps.reduce((acc, curr) => {
    const levelWithNewRoom = new Map([...acc].concat([...curr]))
    return levelWithNewRoom
  }, level)
}

export const pointMaptoGrid: (ps: PointMap) => Grid = ps => {
  const result: any[][] = []
  ps.forEach((val, coords) => {
    const [x, y] = JSON.parse(coords)
    if (!result[y]) {
      const newRow: any[] = []
      newRow[x] = val
      result[y] = newRow
    } else {
      result[y][x] = val
    }
  })

  for (let i = 0; i < result.length; i++) {
    if (!result[i]) {
      result[i] = []
    }
  }
  return normalizeArray(result)
}
