interface Vertex {
  id: string
  discovered?: boolean
  parent?: string
}

type Edge = [string, string]

interface Graph {
  vertices: Vertex[]
  edges: Edge[]
}

type Point = [number, number]

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

interface IUnitVector {
  coords: Point
  dir: Direction
}
