import Phaser from 'phaser'
import { levelPointMapToGrid } from './utils/helpers'
import { insertRoom, makeNewLevel } from './utils/shapeGenerator'

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

  scene.load.image('dungeonTiles', 'assets/0x72_DungeonTilesetII_v1.3.png')
  scene.load.tilemapTiledJSON(
    'dungeonMap',
    'assets/0x72_DungeonTilesetII_v1.3.json',
  )
}

let cursors
let ghost

let controls

function create() {
  const scene: Phaser.Scene = this

  const newLevel = makeNewLevel()
  const levelWithRoom1 = insertRoom(newLevel, 3, 3, [1, 2])
  const levelWithRoom2 = insertRoom(levelWithRoom1, 5, 7, [6, 6])
  const levelWithRoom3 = insertRoom(levelWithRoom2, 4, 4, [15, 10])

  const initalPos: Point = [1, 4]

  render(scene, levelWithRoom3, initalPos)

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

const render = (scene: Phaser.Scene, levelCoords: Level, charPos: Point) => {
  const level = levelPointMapToGrid(levelCoords)
  const floorMap = scene.make.tilemap({
    data: level.floor,
    tileWidth: 16,
    tileHeight: 16,
  } as Phaser.Types.Tilemaps.TilemapConfig)
  const tiles2 = floorMap.addTilesetImage('dungeonTiles')
  const layer2 = floorMap.createStaticLayer(0, tiles2, 0, 0)
  layer2.scaleX = 3
  layer2.scaleY = 3

  const image = scene.add.image(10, 10, 'ghost')
  image.scaleX = 0.1
  image.scaleY = 0.1
  const wallMap = scene.make.tilemap({
    data: level.wall,
    tileWidth: 16,
    tileHeight: 16,
  } as Phaser.Types.Tilemaps.TilemapConfig)

  const tiles = wallMap.addTilesetImage('dungeonTiles')
  // map.setCollisionBetween(0, 9)
  const layer = wallMap.createStaticLayer(0, tiles, 0, 0)
  layer.scaleX = 3
  layer.scaleY = 3
}
