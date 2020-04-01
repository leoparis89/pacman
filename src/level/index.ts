import { tileIdIsFloor, tileIdisEmpty } from '../tiles/tilleUtils'

export const createLevel = (level: PointMap) => ({
  get: (coord: Point): PointContent => level.get(JSON.stringify(coord)),
  set: (coord: Point, value: number) => level.set(JSON.stringify(coord), value),
  isFloor(coord: Point) {
    return tileIdIsFloor(this.set)
  },
})

export class Level {
  constructor(private pointMap: PointMap) {}

  _isFloor = (coord: Point) => tileIdIsFloor(this.get(coord))
  _isEmpty = (coord: Point) => tileIdisEmpty(this.get(coord))
  isFloor = handleValOrArray(this._isFloor)
  isEmpty = handleValOrArray(this._isEmpty)

  get(coord: Point) {
    return this.pointMap.get(JSON.stringify(coord))
  }
  set(coord: Point, value: number) {
    return this.pointMap.set(JSON.stringify(coord), value)
  }
}

const handleValOrArray = fn => args => {
  if (Array.isArray(args)) {
    return args.every(t => fn(t))
  }
  return fn(args)
}
