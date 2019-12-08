import { insertRoom, makeNewLevel } from './shapeGenerator'

describe('insertRoom function', () => {
  it('add room to existing level', () => {
    const existing = makeNewLevel()
    existing.floor.set([1, 1], 'f')
    existing.wall.set([1, 2], 'w')
    const existingWithAddedRoom = insertRoom(existing, 1, 1, [4, 4])
    // expect(existingWithAddedRoom).toEqual('')
  })
})
