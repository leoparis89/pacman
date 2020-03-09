export const roomToPointMap = (room: IRoom) => {
  const { height, width, coords } = room
  const [x, y] = coords
  const result: PointMap = new Map()
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      result.set(JSON.stringify([i + x, j + y]), true)
    }
  }
  return result
}
