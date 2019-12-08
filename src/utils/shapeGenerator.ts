import { mergeLevels } from './bfs'
import TileMap from './tileMapping'

export const createWallsForRoom = (
  width: number,
  height: number,
  coords: Point,
) => {
  const [x, y] = coords
  const result: TileMap = new Map()

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const curr: [number, number] = [i + x, j + y]
      const [currX, currY] = curr

      // Left
      if (i === 0) {
        if (j === 0) {
          result.set([currX, currY - 2], TileMap.wall.corner.top.left[0])
          result.set([currX, currY - 1], TileMap.wall.corner.top.left[1])
          result.set(curr, TileMap.wall.vertical.sample2[1])
        } else if (j === height - 1) {
          result.set([currX, currY - 1], TileMap.wall.corner.bottom.left[0])
          result.set(curr, TileMap.wall.corner.bottom.left[1])
        } else {
          result.set(curr, TileMap.wall.vertical.sample2[1])
        }
      }

      // Right
      else if (i === width - 1) {
        if (j === 0) {
          result.set([currX, currY - 2], TileMap.wall.corner.top.right[0])
          result.set([currX, currY - 1], TileMap.wall.corner.top.right[1])
          result.set(curr, TileMap.wall.vertical.sample1[1])
        } else if (j === height - 1) {
          result.set([currX, currY - 1], TileMap.wall.corner.bottom.right[0])
          result.set(curr, TileMap.wall.corner.bottom.right[1])
        } else {
          result.set(curr, TileMap.wall.vertical.sample1[1])
        }
      } else if (j === 0) {
        result.set([i + x, j + y - 2], TileMap.wall.horizontal.sample1[0])
        result.set([i + x, j + y + -1], TileMap.wall.horizontal.sample1[1])
      } else if (j === height - 1) {
        result.set([currX, currY - 1], TileMap.wall.horizontal.sample1[0])
        result.set(curr, TileMap.wall.horizontal.sample1[1])
      }
    }
  }
  return result
}

export const createFloor = (width: number, height: number, coords: Point) => {
  const [x, y] = coords
  const result: TileMap = new Map()

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      result.set([i + x, j + y], TileMap.floor.sample1)
    }
  }
  return result
}

export const makeNewLevel = () =>
  ({
    floor: new Map(),
    wall: new Map(),
  } as Level)

export function insertRoom(level: Level, width, height, pos) {
  const room: Level = {
    floor: createFloor(width, height, pos),
    wall: createWallsForRoom(width, height, pos),
  }
  return mergeLevels(level, room)
}
