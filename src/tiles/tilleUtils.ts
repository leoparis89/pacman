import tileMap from './tileMap'

export const makeTileCheck = (data: number[]) => (
  tilesToCheck: number | number[],
) => verifyPresence(tilesToCheck, data)

export const verifyPresence = (toVerify: number | number[], data: number[]) => {
  if (Array.isArray(toVerify)) {
    return toVerify.every(el => data.includes(el))
  }
  return data.includes(toVerify)
}

export const getLeafs = (obj, acc: number[] = []) => {
  if (Array.isArray(obj)) {
    obj.forEach(key => acc.push(key))
    return []
  }
  Object.keys(obj).forEach(key => getLeafs(obj[key], acc))
  return acc
}

export const tileIdIsFloor = makeTileCheck(getLeafs(tileMap.blue.floor))

export const tileIdIsHorizontal = makeTileCheck(
  getLeafs(tileMap.blue.wall.horizontal),
)

export const tileIdIsVertical = makeTileCheck(
  getLeafs(tileMap.blue.wall.vertical),
)

export const tileIdisEmpty = makeTileCheck([undefined] as any)
