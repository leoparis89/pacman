import TileMap from './tileMapping'

export const createRoom = (width: number, height: number, coords: Point) => {
  const [x, y] = coords
  const result: TileMap = new Map()

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      // Top Left corner
      if (i === 0) {
        if (j === 0) {
          result.set([i + x, j + y], TileMap.wall.corner.top.left[0])
          continue
        }
        if (j === 1) {
          result.set([i + x, j + y], TileMap.wall.corner.top.left[1])
          continue
        }
        result.set([i + x, j + y], TileMap.wall.vertical.sample1[1])
        continue
      }
      result.set([i + x, j + y], TileMap.floor.sample1)
    }
  }
  return result
}
