interface Vertex {
  id: string
  discovered?: boolean
  parent?: string
}

type Edge = [string, string]

interface Graph {
  nodes: Vertex[]
  edges: Edge[]
}

type Point = [number, number]

type TileMap = Map<Point, any>

type Grid = number[][]

interface LevelArrays {
  floor: Grid
  wall: Grid
}

interface Level {
  floor: TileMap
  wall: TileMap
}
