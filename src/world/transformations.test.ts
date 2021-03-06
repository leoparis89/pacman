import {
  createRoomOnDirection,
  pointMaptoGrid,
  roomToPointMap,
} from './transformations'

describe('roomToPointMap function', () => {
  it('should return the right value', () => {
    const expected = new Map([
      ['[3,4]', true],
      ['[3,5]', true],
      ['[4,4]', true],
      ['[4,5]', true],
    ])
    expect(roomToPointMap({ height: 2, width: 2, coords: [3, 4] })).toEqual(
      expected,
    )
  })
})
describe('createRoomOnDIrection function', () => {
  it('should create room (case up)', () => {
    expect(
      createRoomOnDirection(
        { dir: 'up', coords: [10, 10] },
        { height: 2, width: 2 },
      ),
    ).toEqual({ coords: [9, 8], height: 2, width: 2 })

    expect(
      createRoomOnDirection(
        { dir: 'up', coords: [10, 10] },
        { height: 3, width: 5 },
      ),
    ).toEqual({ coords: [8, 7], height: 3, width: 5 })
  })

  it('should create room (case down)', () => {
    expect(
      createRoomOnDirection(
        { dir: 'down', coords: [10, 10] },
        { height: 2, width: 2 },
      ),
    ).toEqual({ coords: [9, 11], height: 2, width: 2 })

    expect(
      createRoomOnDirection(
        { dir: 'down', coords: [10, 10] },
        { height: 3, width: 7 },
      ),
    ).toEqual({ coords: [7, 11], height: 3, width: 7 })
  })

  it('should create room (case left)', () => {
    expect(
      createRoomOnDirection(
        { dir: 'left', coords: [10, 10] },
        { height: 2, width: 2 },
      ),
    ).toEqual({ coords: [8, 9], height: 2, width: 2 })

    expect(
      createRoomOnDirection(
        { dir: 'left', coords: [10, 10] },
        { height: 5, width: 3 },
      ),
    ).toEqual({ coords: [7, 8], height: 5, width: 3 })
  })

  it('should create room (case right)', () => {
    expect(
      createRoomOnDirection(
        { dir: 'right', coords: [10, 10] },
        { height: 2, width: 2 },
      ),
    ).toEqual({ coords: [11, 9], height: 2, width: 2 })

    expect(
      createRoomOnDirection(
        { dir: 'right', coords: [10, 10] },
        { height: 3, width: 3 },
      ),
    ).toEqual({ coords: [11, 9], height: 3, width: 3 })
  })
})

describe('pointMapToGrid', () => {
  it('should return the right value !', () => {
    const input: PointMap = new Map()
    input.set('[4, 4]', 'x')
    input.set('[5, 4]', 'x')
    input.set('[6, 4]', 'x')
    input.set('[4, 5]', 'x')
    input.set('[5, 5]', 'x')
    input.set('[6, 5]', 'x')
    input.set('[4, 6]', 'x')
    input.set('[5, 6]', 'x')
    input.set('[6, 6]', 'x')

    expect(pointMaptoGrid(input)).toEqual([
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
      ],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
      [undefined, undefined, undefined, undefined, 'x', 'x', 'x'],
    ])
  })

  it('should return the right value (case with seperated elements)', () => {
    const input: PointMap = new Map()
    input.set('[1, 1]', 'x')
    input.set('[4, 4]', 'x')

    expect(pointMaptoGrid(input)).toEqual([
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, 'x', undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, 'x'],
    ])
  })

  it('should normalize result array', () => {
    const input: PointMap = new Map()
    input.set('[1, 1]', 'x')
    input.set('[4, 4]', 'x')

    expect(pointMaptoGrid(input)[0].length).toEqual(5)
  })
})
