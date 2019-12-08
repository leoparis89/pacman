import { Input } from 'phaser'
import {
  _mergeMaps,
  coordsToArray,
  getShortestPath,
  gridToGraph,
  normalizeLevel,
} from './bfs'

// test('gridToGraph should return the right value (case 1)', () => {
//   const o = 'something'
//   const x = null
//   const grid = [
//     [x, x, o, x, x],
//     [x, x, x, x, x],
//     [x, x, o, o, x],
//     [x, x, o, x, o],
//     [x, x, o, x, x],
//   ]

//   const expected = {
//     nodes: [
//       { id: '0:2' },
//       { id: '2:2' },
//       { id: '2:3' },
//       { id: '3:2' },
//       { id: '3:4' },
//       { id: '4:2' },
//     ],
//   }

//   expect(gridToGraph(grid)).toEqual(expected)
// })

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
      nodes: [{ id: '2:2' }],
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
      nodes: [{ id: '2:2' }, { id: '4:3' }],
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
      nodes: [
        {
          id: '2:2',
        },
        {
          id: '3:2',
        },
      ],
      edges: [['2:2', '3:2'], ['3:2', '2:2']],
    }

    expect(gridToGraph(grid)).toEqual(expected)
  })

  test('it should return the right value (case1)', () => {
    const o = 'something'
    const x = undefined
    const grid = [[x, x, x], [o, o, o], [x, x, o]]

    const expected = {
      nodes: [
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
//     nodes: [
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
      nodes: [
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
      edges: [['a', 'b'], ['a', 'c'], ['a', 'd'], ['c', 'e']],
    }

    expect(getShortestPath(input, 'a', 'e')).toEqual(['a', 'c', 'e'])
  })
})

describe('gridToGraph then getShortestPath', () => {
  it('should return the right value (case1)', () => {
    const o = 'something'
    const x = undefined
    const grid = [[x, x, x], [o, o, o], [x, x, o]]

    const expected: Graph = {
      nodes: [
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
    const grid = [
      [8, 3, 3], ///////
      [8, 8, 8],
      [3, 3, 3], // Path closed !
    ]
    expect(normalizeLevel(grid, 8)).toEqual([
      [true, undefined, undefined],
      [true, true, true],
      [undefined, undefined, undefined],
    ])
  })
})

describe('coordsToArray', () => {
  it('should return the right value !', () => {
    const input: TileMap = new Map()
    input.set([4, 4], 'x')
    input.set([5, 4], 'x')
    input.set([6, 4], 'x')
    input.set([4, 5], 'x')
    input.set([5, 5], 'x')
    input.set([6, 5], 'x')
    input.set([4, 6], 'x')
    input.set([5, 6], 'x')
    input.set([6, 6], 'x')

    expect(coordsToArray(input)).toEqual([
      [],
      [],
      [],
      [],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
    ])
  })
})

describe('_mergeMaps', () => {
  it('should return the right value', () => {
    const m1: TileMap = new Map([[[3, 4], 'x'], [[3, 5], 'x']])
    const m2: TileMap = new Map([[[1, 1], 'x']])
    const expected = new Map([[[3, 4], 'x'], [[3, 5], 'x'], [[1, 1], 'x']])
    expect(_mergeMaps(m1, m2)).toEqual(expected)
  })
})
