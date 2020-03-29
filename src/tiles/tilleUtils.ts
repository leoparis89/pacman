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

export const getTileValules = (obj, acc?: number[]) => {
  const result: number[] = []
  if (!acc) {
    acc = result
  }
  if (typeof obj === 'number') {
    acc.push(obj)
    return
  }
  Object.values(obj).forEach(val => getTileValules(val, acc))

  return result
}
