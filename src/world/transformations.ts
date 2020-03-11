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
      result.set(JSON.stringify([i + x, j + y]), true)
    }
  }
  return result
}

export const roomsToPointMap = (rooms: IRoom[]) => {
  const maps = rooms.map(roomToPointMap)
  const temp: any[] = []
  maps.forEach(m => {
    temp.push(...m)
  })
  return new Map(temp) as PointMap
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
