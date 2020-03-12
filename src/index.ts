import { flow } from 'lodash'
import Phaser from 'phaser'
import settings from './settings'
import { handleCursor } from './utils/controls'
import { makeLevel } from './world'
import {
  getMinXY,
  paintGrid,
  pointMaptoGrid,
  shiftPointMapOutOfNegative,
} from './world/helpers'
import { addRoomsToPointMap } from './world/mazeLogic'

const { screen, tile } = settings

const config = {
  type: Phaser.AUTO,
  width: screen.width,
  height: screen.height,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
}

const stop: IDirection = {
  up: false,
  down: false,
  right: false,
  left: false,
}

/**
 * Side effect creates the game
 */
const game = new Phaser.Game(config)
console.log(game)

function preload() {
  const scene: Phaser.Scene = this
  scene.load.image('ground', 'assets/platform.png')
  scene.load.image('ghost', 'assets/ghost.png')
  scene.load.spritesheet('hero', 'assets/hero.png', {
    frameWidth: 32,
    frameHeight: 32,
  })

  scene.load.image('myTiles', 'assets/myTiles.png')
  scene.load.tilemapTiledJSON('myTilesMap', 'assets/myTiles.json')
}

let character: Phaser.Physics.Arcade.Sprite
let cursors: Phaser.Types.Input.Keyboard.CursorKeys

let camera: Phaser.Cameras.Scene2D.Camera

function create() {
  const scene: Phaser.Scene = this

  camera = scene.cameras.main

  setup(scene)

  cursors = scene.input.keyboard.createCursorKeys()

  scene.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  })

  scene.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('hero', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1,
  })

  scene.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('hero', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1,
  })

  scene.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('hero', { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1,
  })
}

function update(time, delta) {
  handleCursor(cursors, character, stop)
}

const setup = (scene: Phaser.Scene) => {
  const levelPointMap = makeLevel()

  const [minX, minY] = getMinXY(levelPointMap)
  console.log(minX, minY)

  const grid = flow(
    shiftPointMapOutOfNegative,
    pointMaptoGrid,
    paintGrid(292),
  )(levelPointMap)

  const floorMap = scene.make.tilemap({
    data: grid,
    tileWidth: tile.size,
    tileHeight: tile.size,
  } as Phaser.Types.Tilemaps.TilemapConfig)
  const floorTiles = floorMap.addTilesetImage('myTiles')
  const floorLayer = floorMap.createStaticLayer(0, floorTiles, 0, 0)
  // const boundsMap = scene.make.tilemap({
  //   data: reverseGrid(level.floor, 388),
  //   tileWidth: 16,
  //   tileHeight: 16,
  // } as Phaser.Types.Tilemaps.TilemapConfig)

  // wallMap.setCollision([1, 33])
  // const boundsTiles = boundsMap.addTilesetImage('dungeonTiles')
  // const boundsLayer = boundsMap.createStaticLayer(0, boundsTiles, 0, 0)
  // boundsLayer.scaleX = 3
  // boundsLayer.scaleY = 3
  // boundsMap.setCollision(388)
  // boundsLayer.forEachTile((tile: Phaser.Tilemaps.Tile) => {}) // boundsLayer.setSize(1, 1)
  // const image = scene.add.image(350, 350, 'ghost')
  // image.setDisplaySize(42, 42)

  const charOffset = {
    // x: (3 + 1) * settings.tile.size,
    // y: 1 * settings.tile.size,
    x: -minX * settings.tile.size,
    y: -minY * settings.tile.size,
  }
  character = scene.physics.add.sprite(charOffset.x, charOffset.y, 'hero')
  camera.startFollow(character)
  // character.setSize(settings.character.width, settings.character.height)
  // character.setDisplaySize(settings.character.width, settings.character.height)

  // char.setVelocityX(30)

  // const wallMap = scene.make.tilemap({
  //   data: level.wall,
  //   tileWidth: tile.size,
  //   tileHeight: tile.size,
  // } as Phaser.Types.Tilemaps.TilemapConfig)

  // const wallTiles = wallMap.addTilesetImage('dungeonTiles')
  // // map.(setCollision)Between(0, 9)
  // const wallLayer = wallMap.createStaticLayer(0, wallTiles, 0, 0)
  // wallLayer.scaleX = tile.scaling
  // wallLayer.scaleY = tile.scaling

  // wallLayer.forEachTile((tile: Phaser.Tilemaps.Tile) => {
  //   tile.collisionCallback = () => {
  //     stop = handleWallCollision(character, tile)
  //   }
  // })

  // scene.physics.add.collider(character, wallLayer)
}
