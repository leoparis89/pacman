import { flow } from 'lodash'
import { cloneMap } from './levelWrappingUtils'
import {
  handleCorners,
  handleEdgeCases,
  handleSingle,
  handleTrivialWalls,
  handleDeadEnds,
  handleCornerConnections,
} from './levelWrapping'
// const handleConnectedCorners = (levelWithBorder: PointMap) => (
//   tileValue,
//   key,
// ) => {
//   const [x, y] = JSON.parse(key)
//   const dirs = makeDirUtils([x, y])
//   // const isFree = makeIsEmpy(levelWithBorder)
//   const isFloor = makeIsFloor(levelWithBorder)
//   if (tileValue === tileMap.blue.wall.corner.top.left[0]) {
//     if (isFloor(dirs.up)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 33)
//     } else if (isFloor(dirs.down)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 50)
//     }
//     return
//   }
// }
export const makeWrapper = handleWrapping => level => {
  const levelWithBorder = cloneMap(level)
  levelWithBorder.forEach(handleWrapping(levelWithBorder))
  return levelWithBorder
}
const levelWrappers = [
  handleCorners,
  handleEdgeCases,
  handleSingle,
  handleTrivialWalls,
  handleDeadEnds,
  handleCornerConnections,
].map(makeWrapper)
export const wrapLevel = (level: PointMap) => flow(...levelWrappers)(level)