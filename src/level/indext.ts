export const createLevelInstance = (level: PointMap) => ({
  get: (coord: Point): number | undefined => level.get(JSON.stringify(coord)),
  set: (coord: Point, value: number) => level.set(JSON.stringify(coord), value),
})
