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
