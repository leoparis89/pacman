import { _mergeMaps, getShortestPath, gridToGraph } from './bfs'
import { normalizeArray, normalizeGrid, pointMaptoGrid } from './helpers'

describe('gridToGraph function', () => {
  test('it should return the right value (single value)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [x, x, x, x, x],
      [x, x, x, x, x],
      [x, x, o, x, x],
      [x, x, x, x, x],
      [x, x, x, x, x],
    ]

    const expected = {
      vertices: [{ id: '2:2' }],
      edges: [],
    }

    expect(gridToGraph(grid)).toEqual(expected)
  })

  test('it should return the right value (two unlinked values)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [x, x, x, x, x],
      [x, x, x, x, x],
      [x, x, o, x, x],
      [x, x, x, x, o],
      [x, x, x, x, x],
    ]

    const expected = {
      vertices: [{ id: '2:2' }, { id: '4:3' }],
      edges: [],
    }

    expect(gridToGraph(grid)).toEqual(expected)
  })

  test('it should return the right value (one link)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [x, x, x, x, x],
      [x, x, x, x, x],
      [x, x, o, o, x],
      [x, x, x, x, x],
      [x, x, x, x, x],
    ]

    const expected = {
      vertices: [
        {
          id: '2:2',
        },
        {
          id: '3:2',
        },
      ],
      edges: [
        ['2:2', '3:2'],
        ['3:2', '2:2'],
      ],
    }

    expect(gridToGraph(grid)).toEqual(expected)
  })

  test('it should return the right value (case1)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [x, x, x],
      [o, o, o],
      [x, x, o],
    ]

    const expected = {
      vertices: [
        {
          id: '0:1',
        },
        {
          id: '1:1',
        },
        {
          id: '2:1',
        },
        {
          id: '2:2',
        },
      ],
      edges: [
        ['0:1', '1:1'],
        ['1:1', '0:1'],
        ['1:1', '2:1'],
        ['2:1', '2:2'],
        ['2:1', '1:1'],
        ['2:2', '2:1'],
      ],
    }

    expect(gridToGraph(grid)).toEqual(expected)
  })
})
// test('gridToGraph should return the right value (null path)', () => {
//   const o = null
//   const x = 'wall'
//   const grid = [
//     [x, x, x, x, x],
//     [x, x, x, x, x],
//     [x, x, o, o, x],
//     [x, x, x, x, x],
//     [x, x, x, x, x],
//   ]

//   const expected = {
//     vertices: [
//       {
//         id: '2:2',
//       },
//       {
//         id: '3:2',
//       },
//     ],
//     edges: [['2:2', '3:2'], ['3:2', '2:2']],
//   }

//   expect(gridToGraph(grid, null)).toEqual(expected)
// })

describe('getShortestPath function', () => {
  test('it should return the shortest path from seed node to goal node', () => {
    const input: Graph = {
      vertices: [
        {
          id: 'a',
        },
        {
          id: 'b',
        },
        {
          id: 'c',
        },
        {
          id: 'd',
        },
        {
          id: 'e',
        },
      ],
      edges: [
        ['a', 'b'],
        ['a', 'c'],
        ['a', 'd'],
        ['c', 'e'],
      ],
    }

    expect(getShortestPath(input, 'a', 'e')).toEqual(['a', 'c', 'e'])
  })
})

describe('gridToGraph then getShortestPath', () => {
  it('should return the right value (case1)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [x, x, x],
      [o, o, o],
      [x, x, o],
    ]

    const expected: Graph = {
      vertices: [
        {
          id: '0:1',
        },
        {
          id: '1:1',
        },
        {
          id: '2:1',
        },
        {
          id: '2:2',
        },
      ],
      edges: [
        ['0:1', '1:1'],
        ['1:1', '0:1'],
        ['1:1', '2:1'],
        ['2:1', '2:2'],
        ['2:1', '1:1'],
        ['2:2', '2:1'],
      ],
    }

    expect(gridToGraph(grid)).toEqual(expected)
    expect(getShortestPath(expected, '0:1', '2:2')).toEqual([
      '0:1',
      '1:1',
      '2:1',
      '2:2',
    ])
  })

  it('should return the right value (2x2 no obstacles horizontal)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, o], ///////
      [o, o],
    ]

    const graph = gridToGraph(grid)
    expect(graph.edges).toEqual([
      ['0:0', '0:1'],
      ['0:0', '1:0'],
      ['1:0', '1:1'],
      ['1:0', '0:0'],
      ['0:1', '0:0'],
      ['0:1', '1:1'],
      ['1:1', '1:0'],
      ['1:1', '0:1'],
    ])
    expect(getShortestPath(graph, '0:0', '1:0')).toEqual(['0:0', '1:0'])
  })

  it('should return the right value (2x2 no obstacles vertical)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, o], ///////
      [o, o],
    ]

    const graph = gridToGraph(grid)
    expect(graph.edges).toEqual([
      ['0:0', '0:1'],
      ['0:0', '1:0'],
      ['1:0', '1:1'],
      ['1:0', '0:0'],
      ['0:1', '0:0'],
      ['0:1', '1:1'],
      ['1:1', '1:0'],
      ['1:1', '0:1'],
    ])
    expect(getShortestPath(graph, '0:0', '0:1')).toEqual(['0:0', '0:1'])
  })

  it('should return the right value (3x3 no obstacles horizontal)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, o, o], ///////
      [o, o, o],
      [o, o, o],
    ]

    const graph = gridToGraph(grid)
    expect(getShortestPath(graph, '0:0', '2:0')).toEqual(['0:0', '1:0', '2:0'])
  })

  it('should return the right value (3x3 no obstacles vertical)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, o, o], ///////
      [o, o, o],
      [o, o, o],
    ]

    const graph = gridToGraph(grid)
    expect(getShortestPath(graph, '0:0', '0:2')).toEqual(['0:0', '0:1', '0:2'])
  })

  it('should return the right value (case with obstacles)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, x, x, o], ///////
      [o, x, o, o],
      [o, o, o, x],
      [o, x, x, x],
    ]

    const graph = gridToGraph(grid)
    expect(getShortestPath(graph, '0:0', '3:0')).toEqual([
      '0:0',
      '0:1',
      '0:2',
      '1:2',
      '2:2',
      '2:1',
      '3:1',
      '3:0',
    ])
  })

  it('should return null if there is no path', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, x, x, o], ///////
      [o, x, o, o],
      [o, o, x, x], // Path closed !
      [o, x, x, x],
    ]

    const graph = gridToGraph(grid)
    expect(getShortestPath(graph, '0:0', '3:0')).toEqual(null)
  })

  it("should throw if start node doesn't exist exist", () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, x, x, o], ///////
      [o, x, o, o],
      [o, o, x, x], // Path closed !
      [o, x, x, x],
    ]

    const graph = gridToGraph(grid)
    let errorMessage
    try {
      getShortestPath(graph, 'foo', '3:0')
    } catch (error) {
      errorMessage = error.message
    }
    expect(errorMessage).toEqual('Start node with id "foo" doesn\'t exist!')
  })

  it("should throw if goal node doesn't exist exist", () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, x, x, o], ///////
      [o, x, o, o],
      [o, o, x, x], // Path closed !
      [o, x, x, x],
    ]

    const graph = gridToGraph(grid)
    let errorMessage
    try {
      getShortestPath(graph, '0:0', 'bar')
    } catch (error) {
      errorMessage = error.message
    }
    expect(errorMessage).toEqual('Goal node with id "bar" doesn\'t exist!')
  })
})

describe('normalizeLevel function', () => {
  it('should put true on chosen path and undefined elsewhere ', () => {
    const grid: Grid = [
      [8, 3, 3], ///////
      [8, 8, 8],
      [3, 3, 3], // Path closed !
    ]
    expect(normalizeGrid(grid, 8)).toEqual([
      [true, undefined, undefined],
      [true, true, true],
      [undefined, undefined, undefined],
    ])
  })
})

describe('_mergeMaps', () => {
  it('should return the right value', () => {
    const m1: PointMap = new Map([
      ['[3, 4]', 'x'],
      ['[3, 5]', 'x'],
    ])
    const m2: PointMap = new Map([['[1, 1]', 'x']])
    const expected = new Map([
      ['[3, 4]', 'x'],
      ['[3, 5]', 'x'],
      ['[1, 1]', 'x'],
    ])
    expect(_mergeMaps(m1, m2)).toEqual(expected)
  })

  it('should return the right value (case overriding)', () => {
    const m1: PointMap = new Map([
      ['[3, 4]', 'x'],
      ['[3, 5]', 'x'],
    ])
    const m2: PointMap = new Map([
      ['[3, 4]', 'o'],
      ['[1, 1]', 'o'],
    ])
    const expected = new Map([
      ['[3, 4]', 'o'],
      ['[3, 5]', 'x'],
      ['[1, 1]', 'o'],
    ])
    expect(_mergeMaps(m1, m2)).toEqual(expected)
  })
})

// describe.skip('mergeLevels', () => {
//   it('it should return the right value', () => {
//     const l1: Level = {
//       floor: new Map([[[1, 1], 'o']]),
//       wall: new Map(),
//     }
//     const l2: Level = {
//       floor: new Map([[[1, 2], 'o']]),
//       wall: new Map([[[4, 4], 'x']]),
//     }

//     const expected: Level = {
//       floor: new Map([
//         [[1, 2], 'o'],
//         [[1, 1], 'o'],
//       ]),
//       wall: new Map([[[4, 4], 'x']]),
//     }
//     // expect(mergeLevels(l1, l2)).toEqual(expected)
//   })
// })

describe('NormalizeArray function', () => {
  it('should return the right value', () => {
    const input = [[2], [undefined, undefined, 4, undefined]]
    expect(normalizeArray(input)).toEqual([
      [2, undefined, undefined, undefined],
      [undefined, undefined, 4, undefined],
    ])
  })
})
