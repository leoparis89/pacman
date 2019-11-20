import Phaser, { Tilemaps } from 'phaser'
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
  this.load.spritesheet('dude', 'assets/dude.png', {
    frameWidth: 32,
    frameHeight: 48,
  })
}

let cursors

let ghost

function create() {
  const scene: Phaser.Scene = this
  // scene.add.image(400, 300, 'sky')
  const x = null
  const o = 9
  const level = [
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, o],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, o, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x],
    [x, x, x, x, x, x, x, x, x, o, x, x, x, x, x, x, x, x, x, o],
  ]
  const map = scene.make.tilemap({
    data: level,
    tileWidth: 48,
    tileHeight: 48,
  } as any)
  const tiles = map.addTilesetImage('tiles')
  map.setCollisionBetween(0, 9)
  const layer = map.createStaticLayer(0, tiles, 0, 0)

  ghost = scene.physics.add.image(200, 200, 'ghost')
  ghost.displayWidth = 48
  ghost.displayHeight = 48

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
}
