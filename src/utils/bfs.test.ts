import { gridToGraph } from './bfs'

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

test('gridToGraph should return the right value (single value)', () => {
  const o = 'something'
  const x = null
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

test('gridToGraph should return the right value (two unlinked values)', () => {
  const o = 'something'
  const x = null
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

test('gridToGraph should return the right value (one link)', () => {
  const o = 'something'
  const x = null
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

test.skip('gridToGraph should return the right value (more complex)', () => {
  const o = 'something'
  const x = null
  const grid = [
    [x, x, x, x, x],
    [x, x, x, x, x],
    [x, x, o, o, x],
    [x, x, x, o, x],
    [x, x, x, x, x],
  ]

  const expected = {
    nodes: [{ id: '2:2' }, { id: '2:3' }, { id: '3:3' }],
    edges: [['2:2', '3:2']],
  }

  expect(gridToGraph(grid, o)).toEqual(expected)
})
