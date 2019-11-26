import { createRoom } from './shapeGenerator'

describe('createRoom function', () => {
  it('return the right value ', () => {
    const result = new Map([
      [{ x: 8, y: 9 }, 129],
      [{ x: 8, y: 10 }, 129],
      [{ x: 8, y: 11 }, 129],
      [{ x: 8, y: 12 }, 129],
      [{ x: 9, y: 9 }, 129],
      [{ x: 9, y: 10 }, 129],
      [{ x: 9, y: 11 }, 129],
      [{ x: 9, y: 12 }, 129],
      [{ x: 10, y: 9 }, 129],
      [{ x: 10, y: 10 }, 129],
      [{ x: 10, y: 11 }, 129],
      [{ x: 10, y: 12 }, 129],
    ])
    expect(createRoom(3, 4, { x: 8, y: 9 })).toEqual(result)
  })
})
