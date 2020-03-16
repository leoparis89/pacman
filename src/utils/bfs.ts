export const gridToGraph = (grid: any[][]) => {
  const getCell = _getCell(grid)
  const vertices: IVertex[] = []

  const edges: Edge[] = []

  grid.forEach((row, j) => {
    row.forEach((cell, i) => {
      const id = _makeId(i, j)
      if (cell) {
        const vertex: IVertex = {
          id,
        }
        vertices.push(vertex)

        // node on top
        if (getCell(i, j + 1)) {
          edges.push([id, _makeId(i, j + 1)])
        }
        // node under
        if (getCell(i, j - 1)) {
          edges.push([id, _makeId(i, j - 1)])
        }
        // node on the left
        if (getCell(i - 1, j)) {
          edges.push([id, _makeId(i - 1, j)])
        }
        // node on the right
        if (getCell(i + 1, j)) {
          edges.push([id, _makeId(i + 1, j)])
        }
      }
    })
  })
  return { vertices, edges }
}

const _getCell = grid => (i, j) => grid[j] && grid[j][i]
const _makeId = (i, j) => `${i}:${j}`

export const getShortestPath = (g: IGraph, startId: string, goalId: string) => {
  const graph: IGraph = JSON.parse(JSON.stringify(g))
  const getNode = _getNode(graph.vertices)

  const seed = getNode(startId)
  const goal = getNode(goalId)

  if (!seed) {
    throw new Error(`Start node with id "${startId}" doesn't exist!`)
  }

  if (!goal) {
    throw new Error(`Goal node with id "${goalId}" doesn't exist!`)
  }

  const queue: IVertex[] = []
  seed.discovered = true
  queue.unshift(seed)

  while (queue.length) {
    const current = queue.pop()!
    // if current is the goal return current
    if (current.id === goalId) {
      return getPath(graph.vertices, startId, goalId)
    }
    const neighbors = getNeighbors(current.id, graph)

    for (const neighbor of neighbors) {
      if (!neighbor.discovered) {
        neighbor.discovered = true
        neighbor.parent = current.id
        queue.unshift(neighbor)
      }
    }
  }
  return null
}

function getNeighbors(id, graph: IGraph) {
  const connectedEdges = graph.edges.filter(e => e[0] === id)
  const neighbors = graph.vertices.filter(n =>
    connectedEdges.some(e => n.id === e[1]),
  )
  return neighbors
}

function getPath(nodes: IVertex[], seedId, goalId) {
  const getNode = _getNode(nodes)
  const result = [goalId]

  const goal = getNode(goalId)!

  let current = getNode(goal.parent!)!
  result.push(current.id)

  while (current.id !== seedId) {
    current = getNode(current.parent!)!
    result.push(current.id)
  }
  return result.reverse()
}

const _getNode = (nodes: IVertex[]) => (id: string) =>
  nodes.find(n => n.id === id)
