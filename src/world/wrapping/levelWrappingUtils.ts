import { LevelMutator } from '../../level'

export const cloneMap = (map: Map<any, any>) => {
  const cloned = new Map()
  map.forEach((val, key) => cloned.set(key, val))
  return cloned
}

/**
 *
 * @param level
 */
export const createAccessor = level => ({
  get: (coord: Point): number | undefined => level.get(JSON.stringify(coord)),
  set: (coord: Point, value: number) => level.set(JSON.stringify(coord), value),
})

export const makeWrapper = handleWrapping => level => {
  const levelWithBorder = cloneMap(level)

  level.forEach(handleWrapping(new LevelMutator(levelWithBorder)))
  return levelWithBorder
}
