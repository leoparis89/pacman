/**
 * For all cells, replaces "pathValue" with true and sets all other cells to undefined
 */
export function normalizeGrid(level: Grid, pathValue: any) {
  const result: Grid = []
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

export const pointMaptoGrid: (ps: PointMap) => Grid = ps => {
  const result: any[][] = []
  ps.forEach((val, coords) => {
    const [x, y] = JSON.parse(coords)
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

export const reverseGrid = (grid: any[][], filler) => {
  const result: any[][] = JSON.parse(JSON.stringify(grid))

  grid.forEach((row, j) => {
    row.forEach((cell, i) => {
      result[j][i] = cell ? undefined : filler
    })
  })
  return result
}

export const paintGrid = filler => (grid: any[][]) => {
  const result: any[][] = JSON.parse(JSON.stringify(grid))

  grid.forEach((row, j) => {
    row.forEach((cell, i) => {
      result[j][i] = cell ? filler : undefined
    })
  })
  return result
}

export const shiftPointMapOutOfNegative = (level: PointMap) => {
  const [minX, minY] = getMinXY(level)

  const result: PointMap = new Map()

  level.forEach((val, key) => {
    let [x, y]: Point = JSON.parse(key)

    if (minX < 0) {
      x = x - minX
    }

    if (minY < 0) {
      y = y - minY
    }
    result.set(JSON.stringify([x, y]), val)
  })
  return result
}

const getMinXY = (level: PointMap) => {
  let minX = 0
  let minY = 0

  level.forEach((_, key) => {
    const [x, y] = JSON.parse(key)

    if (x < minX) {
      minX = x
    }

    if (y < minY) {
      minY = y
    }
  })
  return [minX, minY]
}

export const getRandomFromArray = (arr: any[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
