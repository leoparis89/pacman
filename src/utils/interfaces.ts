interface IVertex {
  id: string
  discovered?: boolean
  parent?: string
}

type Edge = [string, string]

interface IGraph {
  vertices: IVertex[]
  edges: Edge[]
}

type Point = [number, number]

type PointContent = number | undefined

type ContentVerifier = (p: PointContent) => boolean

type PointMap = Map<string, any>

type Grid = Array<Array<number | undefined>>

interface IRoomDims {
  height: number
  width: number
}

interface IRoom extends IRoomDims {
  coords: Point
  type?: RoomType
}

type RoomType = 'coridoor' | 'suite'

interface IDirection {
  up?: boolean
  down?: boolean
  left?: boolean
  right?: boolean
}

type Direction = 'left' | 'right' | 'up' | 'down'
type Dir8 = Direction | 'bottom-right'

interface IUnitVector {
  coords: Point
  dir: Direction
}
