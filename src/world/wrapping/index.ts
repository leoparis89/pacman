import { flow } from 'lodash'
import {
  handleCorners,
  // handleSingle,
  handleTrivialWalls,
  handleEdgeCases,
} from './levelWrapping'
import { makeWrapper } from './levelWrappingUtils'
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
const levelWrappers = [
  handleCorners,
  handleEdgeCases,
  handleTrivialWalls,
  // handleSingle,
  // handleDeadEnds,
  // handleCornerConnections,
].map(makeWrapper)
export const wrapLevel = (level: PointMap) => flow(...levelWrappers)(level)
