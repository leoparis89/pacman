import { roomsToPointMap } from '../transformations'
import { wrapCorners } from './levelWrapping'

test('wrapCorners should return the right value ', () => {
  const room: IRoom = {
    coords: [4, 4],
    height: 4,
    width: 4,
  }
  const level = roomsToPointMap([room])

  const expected = new Map([
    ['[4,4]', true],
    ['[4,5]', true],
    ['[4,6]', true],
    ['[4,7]', true],
    ['[5,4]', true],
    ['[5,5]', true],
    ['[5,6]', true],
    ['[5,7]', true],
    ['[6,4]', true],
    ['[6,5]', true],
    ['[6,6]', true],
    ['[6,7]', true],
    ['[7,4]', true],
    ['[7,5]', true],
    ['[7,6]', true],
    ['[7,7]', true],
  ])

  expect(wrapCorners(level)).toEqual(expected)
})
