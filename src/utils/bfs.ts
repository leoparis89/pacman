export const gridToGraph = (grid: any[][], path) => {
  const getCell = _getCell(grid)
  const nodes: Vertex[] = []

  const edges: Edge[] = []

  grid.forEach((row, j) => {
    row.forEach((cell, i) => {
      const id = makeId(i, j)
      if (cell === path) {
        const vertex: Vertex = {
          id,
        }
        nodes.push(vertex)

        // node on top
        if (getCell(i, j + 1) === path) {
          edges.push([id, makeId(i, j + 1)])
        }
        // node under
        if (getCell(i, j - 1) === path) {
          edges.push([id, makeId(i, j - 1)])
        }
        // node on the left
        if (getCell(i - 1, j) === path) {
          edges.push([id, makeId(i - 1, j)])
        }
        // node on the right
        if (getCell(i + 1, j) === path) {
          edges.push([id, makeId(i + 1, j)])
        }
      }
    })
  })
  return { nodes, edges }
}

const _getCell = grid => (i, j) => grid[j] && grid[j][i]
const makeId = (i, j) => `${i}:${j}`

export const doBfs = (graph: Graph, seedId) => {
  const seed = graph.nodes.find(n => n.id === seedId)
  if (!seed) {
    throw new Error(`No seed found with id ${seedId}!`)
  }
  const queue: Vertex[] = []
  seed.discovered = true
  queue.unshift(seed)

  while (queue.length) {
    const current = queue.shift()!

    // if current is the goal return current

    const neighbors = getNeighbors(current.id, graph)
    for (const neighbor of neighbors) {
      if (!neighbor.discovered) {
        neighbor.discovered = true
        neighbor.parent = current.id
        queue.unshift(neighbor)
      }
    }
  }
}

function getNeighbors(id, graph: Graph) {
  const connectedEdges = graph.edges.filter(e => e[0] === id)
  const neighbors = graph.nodes.filter(n =>
    connectedEdges.some(e => n.id === e[1]),
  )
  return neighbors
}
