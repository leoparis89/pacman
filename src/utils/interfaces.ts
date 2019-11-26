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

interface Point {
  x: number
  y: number
}

type TileMap = Map<Point, any>
