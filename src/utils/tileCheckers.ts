import tileMap from '../tileMap'

export const isFloor = (tileId: number) => {
  const vals = Object.values(tileMap.blue.floor)

  for (const ids of vals) {
    if (ids.includes(tileId)) {
      return true
    }
  }
  return false
}
