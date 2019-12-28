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

export const enoughSpace = (
  level: PointMap,
  { coords, dir }: PointAndDirection,
  roomToCheck = { height: 8, width: 7 },
) => {
  const { height, width } = roomToCheck
  const [x, y] = coords

  let startI
  let endI
  let startJ
  let endJ

  if (dir === 'up') {
    startI = x - Math.floor(width / 2)
    endI = x + Math.floor(width / 2)
    startJ = y - height
    endJ = y
  } else if (dir === 'down') {
    startI = x - Math.floor(width / 2)
    endI = x + Math.floor(width / 2)
    startJ = y
    endJ = y + height
  } else if (dir === 'left') {
    startI = x - width
    endI = x
    startJ = y - Math.floor(height / 2)
    endJ = y + Math.floor(height / 2)
  } else if (dir === 'right') {
    startI = x
    endI = x + width
    startJ = y - Math.floor(height / 2)
    endJ = y + Math.floor(height / 2)
  }

  for (let i = startI; i < endI; i++) {
    for (let j = startJ; j < endJ; j++) {
      if (level.get(JSON.stringify([i, j]))) {
        return false
      }
    }
  }
  return true
}

const generateLevel = (rooms: IRoom[]) => {}

export const getPossibleDirections = ({ height, width, coords }: IRoom) => {
  const result: PointAndDirection[] = []
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

export const createRoomOnDirection = (
  { dir, coords }: PointAndDirection,
  { height, width },
): IRoom => {
  const [x, y] = coords

  if (dir === 'up') {
    return {
      coords: [x - Math.floor(width / 2), y + height],
      height,
      width,
    }
  }
  return { coords: [x, y], height, width }
}
