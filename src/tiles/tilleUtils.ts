import tileMap from './tileMap'

export const tileIdIsFloor = (tileId: number) => {
  return getLeafs(tileMap.blue.floor).includes(tileId)
}

export const tileIdIsHorizontal = (tileId: number) => {
  return getLeafs(tileMap.blue.wall.horizontal).includes(tileId)
}

export const tileIdIsVertical = (tileId: number) => {
  return getLeafs(tileMap.blue.wall.vertical).includes(tileId)
}

export const getLeafs = (obj, acc: number[] = []) => {
  if (Array.isArray(obj)) {
    obj.forEach(key => acc.push(key))
    return []
  }
  Object.keys(obj).forEach(key => getLeafs(obj[key], acc))
  return acc
}
