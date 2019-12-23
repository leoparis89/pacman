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
type PointMapSer = Map<string, any>

type Grid = number[][]

interface LevelGrid {
  floor: Grid
  // wall: Grid
}

interface Level {
  floor: PointMap
  wall?: PointMap
}

interface LevelState {
  level: Level
  roomsAdded: Room[]
}

interface Room {
  height: number
  width: number
  coord: Point
}

interface IDirection {
  up?: boolean
  down?: boolean
  left?: boolean
  right?: boolean
}
