export const gridToGraph = (grid: any[][]) => {
  const getCell = _getCell(grid)
  const nodes: Vertex[] = []

  const edges: Edge[] = []

  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      const id = makeId(i, j)
      if (cell) {
        const vertex: Vertex = {
          id,
        }
        nodes.push(vertex)

        if (getCell(i, j + 1)) {
          edges.push([id, makeId(i, j + 1)])
        }
        // node under
        if (getCell(i, j + 1)) {
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
