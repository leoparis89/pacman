import { getShortestPath, gridToGraph } from './bfs'

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

    expect(gridToGraph(grid, o)).toEqual(expected)
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

    expect(gridToGraph(grid, o)).toEqual(expected)
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

    expect(gridToGraph(grid, o)).toEqual(expected)
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

    expect(gridToGraph(grid, o)).toEqual(expected)
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

    expect(gridToGraph(grid, o)).toEqual(expected)
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

    const graph = gridToGraph(grid, o)
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

    const graph = gridToGraph(grid, o)
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

  it('should return the right value (2x3 no obstacles horizontal)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, o], ///////
      [o, o],
      [o, o],
    ]

    const graph = gridToGraph(grid, o)
    expect(getShortestPath(graph, '0:0', '1:0')).toEqual(['0:0', '1:0'])
  })

  it('should return the right value (2x3 no obstacles vertical)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, o], ///////
      [o, o],
      [o, o],
    ]

    const graph = gridToGraph(grid, o)
    expect(getShortestPath(graph, '0:0', '0:2')).toEqual(['0:0', '0:1', '0:2'])
  })

  it('should return the right value (3x3 no obstacles horizontal)', () => {
    const o = 'something'
    const x = undefined
    const grid = [
      [o, o, o], ///////
      [o, o, o],
      [o, o, o],
    ]

    const graph = gridToGraph(grid, o)
    expect(getShortestPath(graph, '0:0', '1:0')).toEqual(['0:0', '1:0'])
    //  ["0:0", "0:1", "0:2", "1:2", "2:2", "2:1", "2:0"]
    expect(getShortestPath(graph, '0:0', '2:0')).toEqual('')
  })
})
