import Phaser, { Tilemaps } from 'phaser'
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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
  this.load.image('sky', 'assets/sky.png')
  this.load.image('ground', 'assets/platform.png')
  this.load.image('star', 'assets/star.png')
  this.load.image('bomb', 'assets/bomb.png')
  this.load.image('tiles', 'assets/jungle_set.png')
  this.load.tilemapTiledJSON('map', 'assets/jungle_set.json')
  this.load.spritesheet('dude', 'assets/dude.png', {
    frameWidth: 32,
    frameHeight: 48,
  })
}

let platforms
let player
let cursors
let stars
let bombs
const score = 0
let scoreText
const gameOver = false

function create() {
  const scene: Phaser.Scene = this
  scene.add.image(400, 300, 'sky')
  const level = [[0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0], [undefined, 9, 9]]
  const map = this.make.tilemap({ data: level, tileWidth: 40, tileHeight: 40 })
  const tiles = map.addTilesetImage('tiles')
  const layer = map.createStaticLayer(0, tiles, 0, 0)
  // this.add.image(400, 300, 'star')
  // platforms = this.physics.add.staticGroup()

  // platforms
  //   .create(400, 568, 'ground')
  //   .setScale(2)
  //   .refreshBody()

  // platforms.create(600, 400, 'ground')
  // platforms.create(50, 250, 'ground')
  // platforms.create(750, 220, 'ground')

  player = this.physics.add.sprite(100, 450, 'dude')

  // player.setBounce(0.2)
  // player.setCollideWorldBounds(true)
  // this.physics.add.collider(player, platforms)

  // this.anims.create({
  //   key: 'left',
  //   frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
  //   frameRate: 10,
  //   repeat: -1,
  // })

  // this.anims.create({
  //   key: 'turn',
  //   frames: [{ key: 'dude', frame: 4 }],
  //   frameRate: 20,
  // })

  // this.anims.create({
  //   key: 'right',
  //   frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
  //   frameRate: 10,
  //   repeat: -1,
  // })
  // cursors = this.input.keyboard.createCursorKeys()

  // stars = this.physics.add.group({
  //   key: 'star',
  //   repeat: 11,
  //   setXY: { x: 12, y: 0, stepX: 70 },
  // })
  // stars.children.iterate(child => {
  //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
  // })
  // this.physics.add.collider(stars, platforms)
  // // this.physics.add.overlap(player, stars, collectStar, null, this)

  // scoreText = this.add.text(16, 16, 'score: 0', {
  //   fontSize: '32px',
  //   fill: '#000',
  // })
  // bombs = this.physics.add.group()

  // this.physics.add.collider(bombs, platforms)

  // this.physics.add.collider(player, bombs, hitBomb, null, this)
}
function update() {
  // if (cursors.left.isDown) {
  //   player.setVelocityX(-160)
  //   player.anims.play('left', true)
  // } else if (cursors.right.isDown) {
  //   player.setVelocityX(160)
  //   player.anims.play('right', true)
  // } else {
  //   player.setVelocityX(0)
  //   player.anims.play('turn')
  // }
  // if (cursors.up.isDown && player.body.touching.down) {
  //   player.setVelocityY(-330)
  // }
}

// function collectStar(player, star) {
//   star.disableBody(true, true)

//   score += 10
//   scoreText.setText('Score: ' + score)

//   if (stars.countActive(true) === 0) {
//     stars.children.iterate(child => {
//       child.enableBody(true, child.x, 0, true, true)
//     })

//     const x =
//       player.x < 400
//         ? Phaser.Math.Between(400, 800)
//         : Phaser.Math.Between(0, 400)

//     const bomb = bombs.create(x, 16, 'bomb')
//     bomb.setBounce(1)
//     bomb.setCollideWorldBounds(true)
//     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
//   }
// }
// function hitBomb(player, bombs) {
//   this.physics.pause()

//   player.setTint(0xff0000)

//   player.anims.play('turn')

//   gameOver = true
// }
