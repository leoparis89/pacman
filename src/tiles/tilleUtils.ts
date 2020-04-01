import tileMap from './tileMap'

/**
 *
 * @param data
 */
export const makeTileChecker = (data: number[]) => (
  tilesToCheck: number | number[],
) => verifyPresence(tilesToCheck, data)

/**
 *
 * @param toVerify
 * @param data
 */
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

export const tileIdIsFloor = makeTileChecker(getLeafs(tileMap.blue.floor))

export const tileIdIsHorizontal = makeTileChecker(
  getLeafs(tileMap.blue.wall.horizontal),
)

export const tileIdIsVertical = makeTileChecker(
  getLeafs(tileMap.blue.wall.vertical),
)

export const tileIdisEmpty = makeTileChecker([undefined] as any)
