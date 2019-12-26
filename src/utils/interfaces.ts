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

type Grid = number[][]

interface IRoom {
  height: number
  width: number
  coords: Point
}

interface IDirection {
  up?: boolean
  down?: boolean
  left?: boolean
  right?: boolean
}

type Direction = 'left' | 'right' | 'up' | 'down'

interface PointAndDirection {
  coords: Point
  dir: Direction
}
