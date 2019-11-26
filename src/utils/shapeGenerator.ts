import TileMap from './tileMapping'

export const createRoom = (width: number, height: number, coords: Point) => {
  const [x, y] = coords
  const result: TileMap = new Map()

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      // Left corner
      if (i === 0 && j === 0) {
      }

      result.set([i + x, j + y], TileMap.floor.sample1)
    }
  }
  return result
}
