import Phaser, { Tilemaps } from 'phaser'

import { getShortestPath, gridToGraph } from './utils/bfs'
import level, { emptyLevel } from './utils/level'

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

let gridPos = {
  x: 0,
  y: 0,
}

function create() {
  const scene: Phaser.Scene = this
  // scene.add.image(400, 300, 'sky')
  const map = scene.make.tilemap({
    data: emptyLevel,
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

const graph = gridToGraph(emptyLevel, null)
const path = getShortestPath(graph, '1:1', '9:9')

let i = 0

if (path) {
  setInterval(() => {
    if (!path[i]) {
      return
    }
    const [x, y] = path[i].split(':').map(Number)
    gridPos = {
      x,
      y,
    }
    i++
  }, 500)
}
