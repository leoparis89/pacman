import tileMap from './tileMap'

/**
 *
 * @param data
 */
export const makeTileChecker = (data: PointContent[]) => (
  tilesToCheck: PointContent,
) => verifyPresence(tilesToCheck, data)

/**
 *
 * @param toVerify
 * @param data
 */
export const verifyPresence = (
  toVerify: PointContent,
  data: PointContent[],
) => {
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

export const tileIdIsFloor: ContentVerifier = id =>
  makeTileChecker(getLeafs(tileMap.blue.floor))(id)

export const tileIdIsHorizontal = makeTileChecker(
  getLeafs(tileMap.blue.wall.horizontal),
)

export const tileIdIsVertical = makeTileChecker(
  getLeafs(tileMap.blue.wall.vertical),
)

export const tileIdisEmpty = makeTileChecker([undefined])
