import { flow } from 'lodash'
import Phaser from 'phaser'
import { createAnims } from './animation/createAnims'
import { handleCursor } from './animation/handleCursor'
import settings from './settings'
import tileMap from './tiles/tileMap'
import { getLeafs } from './tiles/tilleUtils'
import { makeLevel } from './world'
import { getMinXY, shiftPointMapOutOfNegative } from './world/helpers'
import { addBorder } from './world/mazeLogic'
import { pointMaptoGrid } from './world/transformations'

const { tile } = settings

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-example',
    width: '100%',
    height: '100%',
  },
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
console.log(game)

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

// eslint-disable-next-line no-unused-vars
function update(time, delta) {
  handleCursor(cursors, character)
}

const setup = (scene: Phaser.Scene) => {
  const level = makeLevel()

  const borderWidth = 50

  const grid = flow(
    shiftPointMapOutOfNegative,
    pointMaptoGrid,
    addBorder(borderWidth),
  )(level)

  const floorMap = scene.make.tilemap({
    data: grid,
    tileWidth: tile.size,
    tileHeight: tile.size,
  } as Phaser.Types.Tilemaps.TilemapConfig)
  const floorTiles = floorMap.addTilesetImage('myTiles')
  const floorLayer = floorMap.createStaticLayer(0, floorTiles, 0, 0)

  floorLayer.setCollision(getLeafs(tileMap.blue.wall)!)

  const [minX, minY] = getMinXY(level)
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
