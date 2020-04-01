// import serialize from 'serialize-javascript'
import { roomsToPointMap } from '../transformations'
import { handleCorners, handleTrivialWalls } from './levelWrapping'
import { makeWrapper } from '.'

test('wrapCorners should return the right value ', () => {
  const room: IRoom = {
    coords: [0, 0],
    height: 4,
    width: 4,
    type: 'suite',
  }
  const level = roomsToPointMap([room])

  const result = makeWrapper(handleCorners)(level)
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

test('wrapTrivialWalls should return the right value ', () => {
  const room: IRoom = {
    coords: [0, 0],
    height: 4,
    width: 4,
    type: 'suite',
  }
  const level = roomsToPointMap([room])

  const result = makeWrapper(handleTrivialWalls)(level)

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
    ['[0,-1]', 2],
    ['[-1,0]', 32],
    ['[-1,1]', 32],
    ['[-1,2]', 32],
    ['[0,4]', 2],
    ['[-1,3]', 32],
    ['[1,-1]', 2],
    ['[1,4]', 2],
    ['[2,-1]', 2],
    ['[2,4]', 2],
    ['[3,-1]', 2],
    ['[4,0]', 32],
    ['[4,1]', 32],
    ['[4,2]', 32],
    ['[3,4]', 2],
    ['[4,3]', 32],
  ])

  expect(result).toEqual(expected)
})
