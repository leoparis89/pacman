export const gridToGraph = (grid: any[][]) => {
  const getCell = _getCell(grid)
  const vertices: Vertex[] = []

  const edges: Edge[] = []

  grid.forEach((row, j) => {
    row.forEach((cell, i) => {
      const id = makeId(i, j)
      if (cell) {
        const vertex: Vertex = {
          id,
        }
        vertices.push(vertex)

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
  return { vertices, edges }
}

const _getCell = grid => (i, j) => grid[j] && grid[j][i]
const makeId = (i, j) => `${i}:${j}`

export const getShortestPath = (g: Graph, startId: string, goalId: string) => {
  const graph: Graph = JSON.parse(JSON.stringify(g))
  const getNode = _getNode(graph.vertices)

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

function getNeighbors(id, graph: Graph) {
  const connectedEdges = graph.edges.filter(e => e[0] === id)
  const neighbors = graph.vertices.filter(n =>
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

export const levelCoordsToArray = (l: Level) =>
  ({
    floor: coordsToArray(l.floor),
    wall: coordsToArray(l.wall),
  } as LevelGrid)

export const coordsToArray: (ps: PointMap) => any[][] = ps => {
  const result: any[][] = []
  ps.forEach((val, [x, y]) => {
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
  return normalizeArray(result)
}

export const mergeLevels = (l1: Level, l2: Level) => {
  return {
    floor: _mergeMaps(l1.floor, l2.floor),
    wall: _mergeMaps(l1.wall, l2.wall),
  } as Level
}
export const _mergeMaps = (m1: PointMap, m2: PointMap) => {
  const serializedResult = new Map(
    [...serializeMap(m1)].concat([...serializeMap(m2)]),
  )
  return deSerializeMap(serializedResult)
}
// export const getBounds: (ps: Point[]) => any[][] = ps => {
//   const result = []
// }

export const serializeMap = (m: PointMap) => {
  const serialized = new Map<string, any>()
  m.forEach((val, key) => {
    serialized.set(JSON.stringify(key), val)
  })
  return serialized
}

export const deSerializeMap = (m: Map<string, any>) => {
  const deSerialized = new Map<Point, any>()
  m.forEach((val, key) => {
    deSerialized.set(JSON.parse(key), val)
  })
  return deSerialized
}

export const normalizeArray = (arr: any[][]) => {
  const result: any[][] = []
  const maxRowLength = arr.reduce((acc, curr) => {
    if (curr.length > acc) {
      acc = curr.length
    }
    return acc
  }, 0)

  arr.forEach(row => {
    const newRow: any[] = []
    for (let i = 0; i < maxRowLength; i++) {
      newRow[i] = row[i] || undefined
    }
    result.push(newRow)
  })
  return result
}
