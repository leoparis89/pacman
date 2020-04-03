import { tileIdIsFloor, tileIdisEmpty } from '../tiles/tilleUtils'

export class LevelMutator {
  constructor(private pointMap: PointMap) {}

  _isFloor = (coord: Point) => tileIdIsFloor(this.get(coord))
  _isEmpty = (coord: Point) => tileIdisEmpty(this.get(coord))
  isFloor = handleValOrArray(this._isFloor)
  isEmpty = handleValOrArray(this._isEmpty)

  get(coord: Point): PointContent {
    return this.pointMap.get(JSON.stringify(coord))
  }
  set(coord: Point, value: PointContent) {
    return this.pointMap.set(JSON.stringify(coord), value)
  }
}

const handleValOrArray = (fn: Function) => (args: any[]) => {
  if (isArrayOfArrayLol(args)) {
    return args.every(t => fn(t))
  }
  return fn(args)
}

const isArrayOfArrayLol = (arr: any[]) => {
  return Array.isArray(arr[0])
}
