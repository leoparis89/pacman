import Phaser, { Tilemaps } from 'phaser'

import { gridToGraph } from './utils/bfs'
import level from './utils/level'
const cellSize = 48

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 960,
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
  this.load.image('tiles', 'assets/jungle_set.png')
  this.load.tilemapTiledJSON('map', 'assets/jungle_set.json')
}

let cursors
let ghost

const gridPos = {
  x: 0,
  y: 0,
}

function create() {
  const scene: Phaser.Scene = this
  // scene.add.image(400, 300, 'sky')
  const map = scene.make.tilemap({
    data: level,
    tileWidth: cellSize,
    tileHeight: cellSize,
  } as any)
  const tiles = map.addTilesetImage('tiles')
  map.setCollisionBetween(0, 9)
  const layer = map.createStaticLayer(0, tiles, 0, 0)

  ghost = scene.physics.add.image(200, 200, 'ghost')
  ghost.displayWidth = cellSize
  ghost.displayHeight = cellSize

  ghost.setCollideWorldBounds(true)
  this.physics.add.collider(ghost, layer)

  cursors = this.input.keyboard.createCursorKeys()
}
function update() {
  if (cursors.left.isDown) {
    ghost.setVelocityX(-160)
    return
  }
  if (cursors.right.isDown) {
    ghost.setVelocityX(160)
    return
  }
  if (cursors.up.isDown) {
    ghost.setVelocityY(-160)
    return
  }

  if (cursors.down.isDown) {
    ghost.setVelocityY(160)
    return
  }

  ghost.setVelocity(0)
  // ghost.setX(70)
  ghost.setX(gridPos.x + 24)
  ghost.setY(gridPos.y + 24)
  refreshPos(ghost)
}

function refreshPos(ghost) {
  ghost.setX(gridPos.x * cellSize + cellSize / 2)
  ghost.setY(gridPos.y * cellSize + cellSize / 2)
}

setInterval(() => {
  gridPos.x = gridPos.x + 1
}, 500)

const result = gridToGraph(level, null)
console.log(result)
