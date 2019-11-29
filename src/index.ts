import Phaser, { Tilemaps } from 'phaser'

import {
  coordsToArray,
  getShortestPath,
  gridToGraph,
  normalizeLevel,
} from './utils/bfs'
import { createFloor, createRoom } from './utils/shapeGenerator'

const cellSize = 48

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 1024,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
}

const game = new Phaser.Game(config)

function preload() {
  const scene: Phaser.Scene = this
  scene.load.image('ground', 'assets/platform.png')
  scene.load.image('ghost', 'assets/ghost.png')
  // scene.load.image('tiles', 'assets/jungle_set.png')
  // scene.load.tilemapTiledJSON('map', 'assets/jungle_set.json')

  const bar = scene.load.image(
    'dungeonTiles',
    'assets/0x72_DungeonTilesetII_v1.3.png',
  )
  scene.load.tilemapTiledJSON(
    'dungeonMap',
    'assets/0x72_DungeonTilesetII_v1.3.json',
  )
}

let cursors
let ghost

let controls
// const gridPos = {
//   x: 0,
//   y: 0,
// }

function create() {
  const scene: Phaser.Scene = this

  const floor = createFloor(3, 3, [5, 5])
  const floorLevel = coordsToArray(floor)

  const map2 = scene.make.tilemap({
    data: floorLevel,
    tileWidth: 16,
    tileHeight: 16,
  } as Phaser.Types.Tilemaps.TilemapConfig)

  const tiles2 = map2.addTilesetImage('dungeonTiles')

  const layer2 = map2.createStaticLayer(0, tiles2, 0, 0)
  layer2.scaleX = 4
  layer2.scaleY = 4

  const room = createRoom(3, 3, [4, 5])

  const level = coordsToArray(room)

  // scene.add.image(400, 300, 'sky')
  const map = scene.make.tilemap({
    data: level,
    tileWidth: 16,
    tileHeight: 16,
  } as Phaser.Types.Tilemaps.TilemapConfig)

  const tiles = map.addTilesetImage('dungeonTiles')
  // map.setCollisionBetween(0, 9)
  const layer = map.createStaticLayer(0, tiles, 0, 0)
  layer.scaleX = 4
  layer.scaleY = 4
  // ghost = scene.physics.add.image(200, 200, 'ghost')
  // ghost.displayWidth = cellSize
  // ghost.displayHeight = cellSize

  // ghost.setCollideWorldBounds(true)
  // scene.physics.add.collider(ghost, layer)

  // cursors = scene.input.keyboard.createCursorKeys()

  // scene.cameras.main.setSize(480, 480)
  //  Camera controls
  cursors = this.input.keyboard.createCursorKeys()

  const controlConfig = {
    camera: this.cameras.main,
    left: cursors.left,
    right: cursors.right,
    up: cursors.up,
    down: cursors.down,
    acceleration: 0.04,
    drag: 0.0005,
    maxSpeed: 0.7,
  }
  controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
}

// function update() {
//   const scene: Phaser.Scene = this
//   const camera = scene.cameras.main

//   if (cursors.left.isDown) {
//     // console.log('left')
//     console.log(scene.cameras)
//     camera.scrollX = 20 // ghost.setVelocityX(-160)
//     return
//   }
//   if (cursors.right.isDown) {
//     console.log('right')
//     // ghost.setVelocityX(160)
//     // return
//   }
//   if (cursors.up.isDown) {
//     console.log('up')
//     // ghost.setVelocityY(-160)
//     // return
//   }
//   if (cursors.down.isDown) {
//     console.log('down')
//     // ghost.setVelocityY(160)
//     // return
//   }
//   // ghost.setVelocity(0)
//   // // ghost.setX(70)
//   // ghost.setX(gridPos.x + 24)
//   // ghost.setY(gridPos.y + 24)
//   // refreshPos(ghost)
// }

function update(time, delta) {
  controls.update(delta)
}

// function refreshPos(ghost) {
//   ghost.setX(gridPos.x * cellSize + cellSize / 2)
//   ghost.setY(gridPos.y * cellSize + cellSize / 2)
// }

// const normalized = normalizeLevel(level, null)
// const graph = gridToGraph(normalized)

// const path = getShortestPath(graph, '0:0', '19:19')

// let i = 0

// if (path) {
//   setInterval(() => {
//     if (!path[i]) {
//       return
//     }
//     const [x, y] = path[i].split(':').map(Number)
//     gridPos = {
//       x,
//       y,
//     }
//     i++
//   }, 100)
// }
