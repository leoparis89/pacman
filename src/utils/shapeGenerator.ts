import TileMap from './tileMapping'

export const createRoom = (width: number, height: number, coords: Point) => {
  const [x, y] = coords
  const result: TileMap = new Map()

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      // Left
      if (i === 0) {
        // Top Left corner
        if (j === 0) {
          result.set([i + x, j + y], TileMap.wall.corner.top.left[0])
          continue
        } else if (j === 1) {
          result.set([i + x, j + y], TileMap.wall.corner.top.left[1])
          continue
        }
        // Bottom Left corner
        if (j === height - 2) {
          result.set([i + x, j + y], TileMap.wall.corner.bottom.left[0])
          continue
        }
        if (j === height - 1) {
          result.set([i + x, j + y], TileMap.wall.corner.bottom.left[1])
          continue
        }
        result.set([i + x, j + y], TileMap.wall.vertical.sample2[1])
        continue
      }

      // Left
      if (i === width - 1) {
        // Top Left corner
        if (j === 0) {
          result.set([i + x, j + y], TileMap.wall.corner.top.right[0])
          continue
        } else if (j === 1) {
          result.set([i + x, j + y], TileMap.wall.corner.top.right[1])
          continue
        }
        // Bottom Left corner
        if (j === height - 2) {
          result.set([i + x, j + y], TileMap.wall.corner.bottom.right[0])
          continue
        }
        if (j === height - 1) {
          result.set([i + x, j + y], TileMap.wall.corner.bottom.right[1])
          continue
        }
        result.set([i + x, j + y], TileMap.wall.vertical.sample1[1])
        continue
      }

      // Top

      if (j === 0 || j === height - 2) {
        result.set([i + x, j + y], TileMap.wall.horizontal.sample1[0])
        result.set([i + x, j + y + 1], TileMap.wall.horizontal.sample1[1])
      }
      // result.set([i + x, j + y], TileMap.floor.sample1)
    }
  }
  return result
}
