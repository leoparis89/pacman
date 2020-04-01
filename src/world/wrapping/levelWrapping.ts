// import { tileIdIsFloor } from '../../tiles/tilleUtils'
// import tileMap from '../../tiles/tileMap'
// import {
//   makeDirUtils,
//   makeIsEmpy,
//   isFloor,
//   makeIsHorizontal,
//   makeIsVertical,
// } from '../../level/verifiers'

// export const handleCorners = wrappedLevel => (tileValue, key) => {
//   const isEmpty = makeIsEmpy(wrappedLevel)
//   if (!tileIdIsFloor(tileValue)) {
//     return
//   }
//   const [x, y] = JSON.parse(key)

//   const dirs = makeDirUtils([x, y])

//   if (isEmpty(dirs.up) && isEmpty(dirs.left) && isEmpty(dirs.upLeft)) {
//     wrappedLevel.set(
//       JSON.stringify(dirs.upLeft),
//       tileMap.blue.wall.corner.top.left[0],
//     )
//   }

//   if (isEmpty(dirs.up) && isEmpty(dirs.right) && isEmpty(dirs.upRight)) {
//     wrappedLevel.set(
//       JSON.stringify(dirs.upRight),
//       tileMap.blue.wall.corner.top.right[0],
//     )
//   }

//   if (isEmpty(dirs.down) && isEmpty(dirs.right) && isEmpty(dirs.downRight)) {
//     wrappedLevel.set(
//       JSON.stringify(dirs.downRight),
//       tileMap.blue.wall.corner.bottom.right[0],
//     )
//   }

//   if (isEmpty(dirs.down) && isEmpty(dirs.left) && isEmpty(dirs.downLeft)) {
//     wrappedLevel.set(
//       JSON.stringify(dirs.downLeft),
//       tileMap.blue.wall.corner.bottom.left[0],
//     )
//   }
// }

// export const handleTrivialWalls = (levelWithBorder: PointMap) => (
//   tileValue,
//   key,
// ) => {
//   const isFree = makeIsEmpy(levelWithBorder)
//   if (!tileIdIsFloor(tileValue)) {
//     return
//   }
//   const [x, y] = JSON.parse(key)

//   const dirs = makeDirUtils([x, y])

//   if (isFree(dirs.up)) {
//     levelWithBorder.set(
//       JSON.stringify(dirs.up),
//       tileMap.blue.wall.horizontal.clean[0],
//     )
//   }
//   if (isFree(dirs.down)) {
//     levelWithBorder.set(
//       JSON.stringify(dirs.down),
//       tileMap.blue.wall.horizontal.clean[0],
//     )
//   }
//   if (isFree(dirs.left)) {
//     levelWithBorder.set(
//       JSON.stringify(dirs.left),
//       tileMap.blue.wall.vertical.clean[0],
//     )
//   }
//   if (isFree(dirs.right)) {
//     levelWithBorder.set(
//       JSON.stringify(dirs.right),
//       tileMap.blue.wall.vertical.clean[0],
//     )
//   }
// }

// export const handleEdgeCases = levelWithBorder => (tileValue, key) => {
//   const pointIsFloor = isFloor(levelWithBorder)
//   if (!tileIdIsFloor(tileValue)) {
//     return
//   }
//   const [x, y] = JSON.parse(key)
//   const dirs = makeDirUtils([x, y])

//   /**
//    *
//    *  C?
//    *  xx
//    */
//   if (
//     !pointIsFloor(dirs.right) &&
//     !pointIsFloor([x + 2, y]) &&
//     !pointIsFloor(dirs.upRight) &&
//     pointIsFloor(dirs.downRight)
//   ) {
//     // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
//     levelWithBorder.set(
//       JSON.stringify(dirs.right),
//       tileMap.blue.wall.corner.bottom.left,
//     )
//   }

//   /**
//    *
//    *  ?C
//    *  xx
//    */
//   if (
//     !pointIsFloor(dirs.left) &&
//     !pointIsFloor([x - 2, y]) &&
//     !pointIsFloor(dirs.upLeft) &&
//     pointIsFloor(dirs.downLeft)
//   ) {
//     // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
//     levelWithBorder.set(
//       JSON.stringify(dirs.left),
//       tileMap.blue.wall.corner.bottom.right,
//     )
//   }
//   /**
//    *
//    *  xx
//    *  ?C
//    */
//   if (
//     !pointIsFloor(dirs.left) &&
//     !pointIsFloor([x - 2, y]) &&
//     !pointIsFloor(dirs.downLeft) &&
//     pointIsFloor(dirs.upLeft)
//   ) {
//     // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
//     levelWithBorder.set(
//       JSON.stringify(dirs.left),
//       tileMap.blue.wall.corner.top.right,
//     )
//   }
//   /**
//    *
//    *  xx
//    *  C?
//    */
//   if (
//     !pointIsFloor(dirs.right) &&
//     !pointIsFloor([x + 2, y]) &&
//     !pointIsFloor(dirs.downRight) &&
//     pointIsFloor(dirs.upRight)
//   ) {
//     // levelWithBorder.set(coordLeft, tileMap.blue.wall.corner.bottom.left)
//     levelWithBorder.set(
//       JSON.stringify(dirs.right),
//       tileMap.blue.wall.corner.top.left,
//     )
//   }
// }

// export const handleSingle = (levelWithBorder: PointMap) => (tileValue, key) => {
//   if (!tileIdIsFloor(tileValue)) {
//     return
//   }

//   const isFree = makeIsEmpy(levelWithBorder)
//   const isFloor = isFloor(levelWithBorder)
//   const [x, y] = JSON.parse(key)

//   const dirs = makeDirUtils([x, y])

//   if (
//     isFree(dirs.right) &&
//     isFloor(dirs.upRight) &&
//     isFloor(dirs.downRight) &&
//     isFloor([x + 2, y])
//   ) {
//     levelWithBorder.set(JSON.stringify(dirs.right), 50)
//   }
// }

// export const handleDeadEnds = (levelWithBorder: PointMap) => (
//   tileValue,
//   key,
// ) => {
//   const [x, y] = JSON.parse(key)
//   const dirs = makeDirUtils([x, y])
//   const isFree = makeIsEmpy(levelWithBorder)
//   const isFloor = isFloor(levelWithBorder)

//   if (!isFloor([x, y])) {
//     return
//   }
//   /**
//    *  xxx
//    *  o?x
//    */

//   if (isFree(dirs.right) && isFloor(dirs.upRight) && isFloor([x + 2, y])) {
//     levelWithBorder.set(
//       JSON.stringify([x + 1, y]),
//       tileMap.blue.wall.deadEnd.top,
//     )
//   }

//   /**
//    *  xxxx
//    *  o? x
//    *  xxxx
//    */

//   if (isFree(dirs.right) && isFloor(dirs.upRight) && isFloor(dirs.downRight)) {
//     levelWithBorder.set(
//       JSON.stringify([x + 1, y]),
//       tileMap.blue.wall.deadEnd.left,
//     )
//   }
//   // if (isFree(dirs.right) && isFloor(dirs.upRight) && isFloor([x + 2, y])) {
//   //   levelWithBorder.set(
//   //     JSON.stringify([x + 1, y]),
//   //     tileMap.blue.wall.deadEnd.top,
//   //   )
//   // }
//   // if (tileValue === tileMap.blue.wall.corner.top.left[0]){

//   // }

//   // if (tileValue === tileMap.blue.wall.vertical.clean[0]) {
//   //   if (isFloor(dirs.up)) {
//   //     levelWithBorder.set(JSON.stringify([x, y]), 55)
//   //   } else if (isFloor(dirs.down)) {
//   //     levelWithBorder.set(
//   //       JSON.stringify([x, y]),
//   //       tileMap.blue.wall.deadEnd.bottom,
//   //     )
//   //   }
//   //   return
//   // }
//   // if (tileValue === tileMap.blue.wall.horizontal.clean[0]) {
//   //   if (isFloor(dirs.left)) {
//   //     levelWithBorder.set(
//   //       JSON.stringify([x, y]),
//   //       tileMap.blue.wall.deadEnd.left,
//   //     )
//   //   } else if (isFloor(dirs.right)) {
//   //     levelWithBorder.set(
//   //       JSON.stringify([x, y]),
//   //       tileMap.blue.wall.deadEnd.right,
//   //     )
//   //   }
//   // }
// }

// export const handleCornerConnections = (levelWithBorder: PointMap) => (
//   tileValue,
//   key,
// ) => {
//   const [x, y] = JSON.parse(key)
//   const dirs = makeDirUtils([x, y])

//   const isFloor = isFloor(levelWithBorder)
//   const isHorizonal = makeIsHorizontal(levelWithBorder)
//   const isVertival = makeIsVertical(levelWithBorder)
//   // const isFree = makeIsEmpy(levelWithBorder)

//   if (tileValue === tileMap.blue.wall.corner.top.left[0]) {
//     if (isFloor(dirs.left) && isVertival(dirs.up)) {
//       levelWithBorder.set(
//         JSON.stringify([x, y]),
//         tileMap.blue.wall.connection.top.left.case1[0],
//       )
//       return
//     }
//     if (isHorizonal(dirs.left)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 34)
//       return
//     }
//   }

//   if (tileValue === tileMap.blue.wall.corner.top.right[0]) {
//     if (isFloor(dirs.right) && isVertival(dirs.up)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 19)
//       return
//     }
//     // if (isHorizonal(dirs.left)) {
//     //   levelWithBorder.set(JSON.stringify([x, y]), 34)
//     //   return
//     // }
//   }

//   if (tileValue === tileMap.blue.wall.corner.bottom.left[0]) {
//     if (isHorizonal(dirs.left) && isFloor(dirs.down)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 49)
//       return
//     }
//     if (isFloor(dirs.left) && isVertival(dirs.down)) {
//       levelWithBorder.set(JSON.stringify([x, y]), 16)
//       return
//     }
//     // if (isFloor(dirs.left) && isVertival(dirs.up)) {
//     //   levelWithBorder.set(
//     //     JSON.stringify([x, y]),
//     //     tileMap.blue.wall.connection.top.left.case1[0],
//     //   )
//     //   return
//     // }
//     // if (isHorizonal(dirs.left)) {
//     //   levelWithBorder.set(JSON.stringify([x, y]), 34)
//     //   return
//     // }
//   }
//   // if (tileValue === tileMap.blue.wall.corner.top.right[0]) {
//   // }
//   // if (tileValue === tileMap.blue.wall.corner.bottom.left[0]) {
//   // }
//   // if (tileValue === tileMap.blue.wall.corner.bottom.right[0]) {
//   // }
// }
