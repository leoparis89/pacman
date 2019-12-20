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

type PointMap = Map<Point, any>

type Grid = number[][]

interface LevelGrid {
  floor: Grid
  wall: Grid
}

interface Level {
  floor: PointMap
  wall: PointMap
}

interface IStop {
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
}
