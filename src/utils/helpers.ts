/**
 * For all cells, replaces "pathValue" with true and sets all other cells to undefined
 */
export function normalizeGrid(level: Grid, pathValue: any) {
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
