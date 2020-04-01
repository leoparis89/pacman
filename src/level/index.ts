import { tileIdIsFloor } from '../tiles/tilleUtils'

export const createLevel = (level: PointMap) => ({
  get: (coord: Point): PointContent => level.get(JSON.stringify(coord)),
  set: (coord: Point, value: number) => level.set(JSON.stringify(coord), value),
  isFloor(coord: Point) {
    return tileIdIsFloor(this.set)
  },
})

export class Level {
  constructor(private pointMap: PointMap) {}

  get(coord: Point) {
    return this.pointMap.get(JSON.stringify(coord))
  }
  set(coord: Point, value: number) {
    return this.pointMap.set(JSON.stringify(coord), value)
  }
  isFloor(coord: Point) {
    return tileIdIsFloor(this.get(coord))
  }
}
