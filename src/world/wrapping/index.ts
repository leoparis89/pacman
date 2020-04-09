import { flow } from 'lodash'
import {
  makeHandler,
  _handleCorners,
  _handleDeadEnds,
  _handleEdgeCases,
  _handleSingle,
  _handleTrivialWalls,
  _handleUndef,
  _handleCornerConnections,
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
  _handleUndef,
  _handleCorners,
  _handleEdgeCases,
  _handleSingle,
  _handleDeadEnds,
  _handleTrivialWalls,
  _handleCornerConnections,
]
  .map(makeHandler)
  .map(makeWrapper)

export const wrapLevel = (level: PointMap) => flow(...levelWrappers)(level)
