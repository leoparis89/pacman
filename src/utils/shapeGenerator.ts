// export const createWallsForRoom = (
//   width: number,
//   height: number,
//   coords: Point,
// ) => {
//   const [x, y] = coords
//   const result: PointMap = new Map()

//   for (let i = 0; i < width; i++) {
//     for (let j = 0; j < height; j++) {
//       const curr: [number, number] = [i + x, j + y]
//       const [currX, currY] = curr

//       // Left
//       if (i === 0) {
//         if (j === 0) {
//           result.set([currX, currY - 2], TileMap.wall.corner.top.left[0])
//           result.set([currX, currY - 1], TileMap.wall.corner.top.left[1])
//           result.set(curr, TileMap.wall.vertical.left[1])
//         } else if (j === height - 1) {
//           result.set([currX, currY - 1], TileMap.wall.corner.bottom.left[0])
//           result.set(curr, TileMap.wall.corner.bottom.left[1])
//         } else {
//           result.set(curr, TileMap.wall.vertical.left[1])
//         }
//       }

//       // Right
//       else if (i === width - 1) {
//         if (j === 0) {
//           result.set([currX, currY - 2], TileMap.wall.corner.top.right[0])
//           result.set([currX, currY - 1], TileMap.wall.corner.top.right[1])
//           result.set(curr, TileMap.wall.vertical.right[1])
//         } else if (j === height - 1) {
//           result.set([currX, currY - 1], TileMap.wall.corner.bottom.right[0])
//           result.set(curr, TileMap.wall.corner.bottom.right[1])
//         } else {
//           result.set(curr, TileMap.wall.vertical.right[1])
//         }
//       } else if (j === 0) {
//         result.set([i + x, j + y - 2], TileMap.wall.horizontal.sample1[0])
//         result.set([i + x, j + y + -1], TileMap.wall.horizontal.sample1[1])
//       } else if (j === height - 1) {
//         result.set([currX, currY - 1], TileMap.wall.horizontal.sample1[0])
//         result.set(curr, TileMap.wall.horizontal.sample1[1])
//       }
//     }
//   }
//   return result
// }

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

export const roomReducer = (rs: IRoom[], level: PointMap = new Map()) => {
  return rs.reduce((acc, curr) => {
    const newRoom = roomToPointMap(curr)
    const levelWithNewRoom = new Map([...acc].concat([...newRoom]))
    return levelWithNewRoom
  }, level)
}
