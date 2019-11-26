export const gridToGraph = (grid: any[][]) => {
  const getCell = _getCell(grid)
  const nodes: Vertex[] = []

  const edges: Edge[] = []

  grid.forEach((row, j) => {
    row.forEach((cell, i) => {
      const id = makeId(i, j)
      if (cell) {
        const vertex: Vertex = {
          id,
        }
        nodes.push(vertex)

        // node on top
        if (getCell(i, j + 1)) {
          edges.push([id, makeId(i, j + 1)])
        }
        // node under
        if (getCell(i, j - 1)) {
          edges.push([id, makeId(i, j - 1)])
        }
        // node on the left
        if (getCell(i - 1, j)) {
          edges.push([id, makeId(i - 1, j)])
        }
        // node on the right
        if (getCell(i + 1, j)) {
          edges.push([id, makeId(i + 1, j)])
        }
      }
    })
  })
  return { nodes, edges }
}

const _getCell = grid => (i, j) => grid[j] && grid[j][i]
const makeId = (i, j) => `${i}:${j}`

export const getShortestPath = (g: Graph, startId: string, goalId: string) => {
  const graph: Graph = JSON.parse(JSON.stringify(g))
  const getNode = _getNode(graph.nodes)

  const seed = getNode(startId)
  const goal = getNode(goalId)

  if (!seed) {
    throw new Error(`Start node with id "${startId}" doesn't exist!`)
  }

  if (!goal) {
    throw new Error(`Goal node with id "${goalId}" doesn't exist!`)
  }

  const queue: Vertex[] = []
  seed.discovered = true
  queue.unshift(seed)

  while (queue.length) {
    const current = queue.pop()!
    // if current is the goal return current
    if (current.id === goalId) {
      return getPath(graph.nodes, startId, goalId)
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

function getNeighbors(id, graph: Graph) {
  const connectedEdges = graph.edges.filter(e => e[0] === id)
  const neighbors = graph.nodes.filter(n =>
    connectedEdges.some(e => n.id === e[1]),
  )
  return neighbors
}

function getPath(nodes: Vertex[], seedId, goalId) {
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

const _getNode = (nodes: Vertex[]) => (id: string) =>
  nodes.find(n => n.id === id)

export function normalizeLevel(level: any[][], pathValue: any) {
  const result: any[] = []
  level.forEach(row => {
    const newRow: any[] = []
    row.forEach(cell => {
      if (cell === pathValue) {
        newRow.push(true)
      } else {
        newRow.push(undefined)
      }
    })
    result.push(newRow)
  })
  return result
}

export const coordsToArray: (ps: TileMap) => any[][] = ps => {
  const result: any[][] = []
  ps.forEach((val, { x, y }) => {
    if (!result[y]) {
      const newRow: any[] = []
      newRow[x] = val
      result[y] = newRow
    } else {
      result[y][x] = val
    }
  })

  for (let i = 0; i < result.length; i++) {
    if (!result[i]) {
      result[i] = []
    }
  }
  return result
}

// export const getBounds: (ps: Point[]) => any[][] = ps => {
//   const result = []
// }
