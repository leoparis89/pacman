import serialize from 'serialize-javascript'
import { roomsToPointMap } from '../transformations'
import { wrapCorners, wrapTrivialWalls } from './levelWrapping'

test('wrapCorners should return the right value ', () => {
  const room: IRoom = {
    coords: [0, 0],
    height: 4,
    width: 4,
    type: 'suite',
  }
  const level = roomsToPointMap([room])

  const result = wrapCorners(level)
  const expected = new Map([
    ['[0,0]', 7],
    ['[0,1]', 7],
    ['[0,2]', 7],
    ['[0,3]', 7],
    ['[1,0]', 7],
    ['[1,1]', 7],
    ['[1,2]', 7],
    ['[1,3]', 7],
    ['[2,0]', 7],
    ['[2,1]', 7],
    ['[2,2]', 7],
    ['[2,3]', 7],
    ['[3,0]', 7],
    ['[3,1]', 7],
    ['[3,2]', 7],
    ['[3,3]', 7],
    ['[-1,-1]', 0],
    ['[-1,4]', 48],
    ['[4,-1]', 3],
    ['[4,4]', 51],
  ])

  expect(result).toEqual(expected)
})

// test('wrapTrivialWalls should return the right value ', () => {
//   const room: IRoom = {
//     coords: [0, 0],
//     height: 4,
//     width: 4,
//   }
//   const level = roomsToPointMap([room])

//   const result = wrapTrivialWalls(level)

//   const result = new Map([
//     ['[0,0]', true],
//     ['[0,1]', true],
//     ['[0,2]', true],
//     ['[0,3]', true],
//     ['[1,0]', true],
//     ['[1,1]', true],
//     ['[1,2]', true],
//     ['[1,3]', true],
//     ['[2,0]', true],
//     ['[2,1]', true],
//     ['[2,2]', true],
//     ['[2,3]', true],
//     ['[3,0]', true],
//     ['[3,1]', true],
//     ['[3,2]', true],
//     ['[3,3]', true],
//   ])
//   console.log(serialize(result))
//   expect(serialize(result)).toEqual('')
// })
