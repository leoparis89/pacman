import { flow } from 'lodash'
import Phaser from 'phaser'
import settings from './settings'
import tileMap from './tiles/tileMap'
import { getTileValules } from './tiles/tilleUtils'
import { handleCursor } from './animation/handleCursor'
import { makeLevel } from './world'
import { getMinXY, shiftPointMapOutOfNegative } from './world/helpers'
import { addBorder } from './world/mazeLogic'
import { pointMaptoGrid } from './world/transformations'
import { createAnims } from './animation/createAnims'

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

/**
 * Side effect creates the game
 */
const game = new Phaser.Game(config)

function preload() {
  const scene: Phaser.Scene = this
  scene.load.spritesheet('hero', 'assets/hero.png', {
    frameWidth: 32,
    frameHeight: 32,
  })

  scene.load.image('myTiles', 'assets/RogueEnvironment16x16.png')
  scene.load.tilemapTiledJSON('myTilesMap', 'assets/rogue.json')
}

let character: Phaser.Physics.Arcade.Sprite
let cursors: Phaser.Types.Input.Keyboard.CursorKeys

let camera: Phaser.Cameras.Scene2D.Camera

function create() {
  const scene: Phaser.Scene = this

  camera = scene.cameras.main

  createAnims(scene)
  setup(scene)

  cursors = scene.input.keyboard.createCursorKeys()
}

function update(time, delta) {
  handleCursor(cursors, character)
}

const setup = (scene: Phaser.Scene) => {
  const levelPointMap = makeLevel()

  const [minX, minY] = getMinXY(levelPointMap)

  const borderWidth = 50

  const grid = flow(
    shiftPointMapOutOfNegative,
    pointMaptoGrid,
    addBorder(borderWidth),
  )(levelPointMap)

  const floorMap = scene.make.tilemap({
    data: grid,
    tileWidth: tile.size,
    tileHeight: tile.size,
  } as Phaser.Types.Tilemaps.TilemapConfig)
  const floorTiles = floorMap.addTilesetImage('myTiles')
  const floorLayer = floorMap.createStaticLayer(0, floorTiles, 0, 0)

  floorLayer.setCollision(getTileValules(tileMap.blue.wall)!)

  const charOffset = {
    x: -(minX - borderWidth - 4) * settings.tile.size,
    y: -(minY - borderWidth - 4) * settings.tile.size,
  }
  character = scene.physics.add.sprite(charOffset.x, charOffset.y, 'hero')
  camera.startFollow(character)

  /**
   * You can zoom out by changing this porperty to lower values than 1
   */
  camera.zoom = 1
  scene.physics.add.collider(character, floorLayer)
}
