import Phaser from 'phaser'
import { handleCursor } from './utils/controls'
import { levelPointMapToGrid, reverseGrid } from './utils/helpers'
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

let character: Phaser.Physics.Arcade.Sprite
let cursors: Phaser.Types.Input.Keyboard.CursorKeys

function create() {
  const scene: Phaser.Scene = this

  const newLevel = makeNewLevel()
  const levelWithRoom1 = insertRoom(newLevel, 3, 3, [1, 2])
  const levelWithRoom2 = insertRoom(levelWithRoom1, 5, 7, [6, 6])
  const levelWithRoom3 = insertRoom(levelWithRoom2, 4, 4, [15, 10])

  const initalPos: Point = [1, 4]

  render(scene, levelWithRoom3, initalPos)
  cursors = scene.input.keyboard.createCursorKeys()

  // cursors = this.input.keyboard.createCursorKeys()

  // const controlConfig = {
  //   camera: this.cameras.main,
  //   left: cursors.left,
  //   right: cursors.right,
  //   up: cursors.up,
  //   down: cursors.down,
  //   acceleration: 0.04,
  //   drag: 0.0005,
  //   maxSpeed: 0.7,
  // }
  // controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig)
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

let stop
function update(time, delta) {
  handleCursor(cursors, character)
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
  const floorTiles = floorMap.addTilesetImage('dungeonTiles')
  const floorLayer = floorMap.createStaticLayer(0, floorTiles, 0, 0)
  floorLayer.scaleX = 3
  floorLayer.scaleY = 3
  const boundsMap = scene.make.tilemap({
    data: reverseGrid(level.floor, 388),
    tileWidth: 16,
    tileHeight: 16,
  } as Phaser.Types.Tilemaps.TilemapConfig)

  // wallMap.setCollision([1, 33])
  const boundsTiles = boundsMap.addTilesetImage('dungeonTiles')
  const boundsLayer = boundsMap.createStaticLayer(0, boundsTiles, 0, 0)
  boundsLayer.scaleX = 3
  boundsLayer.scaleY = 3
  boundsMap.setCollision(388)
  boundsLayer.forEachTile((tile: Phaser.Tilemaps.Tile) => {})
  // boundsLayer.setSize(1, 1)
  // const image = scene.add.image(350, 350, 'ghost')
  // image.setDisplaySize(42, 42)

  character = scene.physics.add.sprite(430, 430, 'ghost')
  character.setDisplaySize(42, 42)
  character.setCollideWorldBounds(true)
  // char.setVelocityX(30)

  const wallMap = scene.make.tilemap({
    data: level.wall,
    tileWidth: 16,
    tileHeight: 16,
  } as Phaser.Types.Tilemaps.TilemapConfig)

  const wallTiles = wallMap.addTilesetImage('dungeonTiles')
  // map.(setCollision)Between(0, 9)
  const wallLayer = wallMap.createStaticLayer(0, wallTiles, 0, 0)
  wallLayer.scaleX = 3
  wallLayer.scaleY = 3

  wallLayer.forEachTile((tile: Phaser.Tilemaps.Tile) => {
    console.log(tile.index)
    if (tile.index === 256) {
      tile.collisionCallback = handlecol
    }
  })

  scene.physics.add.collider(character, wallLayer)
}

const handlecol = (
  a: Phaser.Physics.Arcade.Sprite,
  b: Phaser.Tilemaps.Tile,
) => {
  if (a.x > b.pixelX * 3) {
    stop = true
  } else {
  }
}
