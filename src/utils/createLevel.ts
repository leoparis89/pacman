import { insertRoom } from './shapeGenerator'

export const createLevel = () => {
  const LENGTH = 3
  const newLevel = makeNewLevel()
  const levelWithRoom1 = insertRoom(newLevel, 3, 3, [0, 0])
}

export const addRoom = (levelState: LevelState, room: Room) => {}

export const makeNewLevel = () =>
  ({
    floor: new Map(),
  } as Level)
