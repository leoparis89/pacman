import tileMap from './tileMap'

export const tileIdIsFloor = (tileId: number) => {
  const vals = Object.values(tileMap.blue.floor)

  for (const ids of vals) {
    if (ids.includes(tileId)) {
      return true
    }
  }
  return false
}

export const getLeafs = (obj, acc: number[] = []) => {
  if (Array.isArray(obj)) {
    obj.forEach(key => acc.push(key))
    return
  }
  Object.keys(obj).forEach(key => getLeafs(obj[key], acc))
  return acc
}
