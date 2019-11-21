interface Vertex {
  id: string
  discovered?: boolean
  parent: string
}

type Edge = [string, string]

interface Graph {
  nodes: Vertex[]
  edges: Edge[]
}
