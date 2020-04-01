export const createLevelInstance = (level: PointMap) => ({
  get: (coord: Point): PointContent => level.get(JSON.stringify(coord)),
  set: (coord: Point, value: number) => level.set(JSON.stringify(coord), value),
})
