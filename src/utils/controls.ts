import settings from '../settings'
import tileMapping from './tileMapping'

export const handleCursor = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  character: Phaser.Physics.Arcade.Sprite,
  stop: IDirection,
) => {
  const cursorDir: IDirection = {
    up: cursors.up!.isDown,
    down: cursors.down!.isDown,
    left: cursors.left!.isDown,
    right: cursors.right!.isDown,
  }

  if (cursorDir.right && !stop.right) {
    character.anims.play('right')
    // character.setVelocityX(160)
  } else if (cursorDir.left) {
    character.anims.play('left')
    // character.setVelocityX(-160)
  } else {
    character.setVelocityX(0)
  } //     character.setVelocityX(-160)

  if (cursorDir.up && !stop.right) {
    character.anims.play('up')
    // character.setVelocityY(-160)
  } else if (cursorDir.down && !stop.down) {
    character.anims.play('down')
    // character.setVelocityY(160)
  } else {
    character.setVelocityY(0)
  } //     character.setVelocityX(-160)

  //   } else if (!stop.right && cursors.right!.isDown) {
  //     character.setVelocityX(160)
  //   } else if (cursors.up!.isDown) {
  //     character.setVelocityY(-160)
  //   } else if (cursors.down!.isDown) {
  //     character.setVelocityY(160)
  //   } else {
  //     character.setVelocityX(0)
  //     character.setVelocityY(0)
  //   }
}

export const handleWallCollision = (
  character: Phaser.Physics.Arcade.Sprite,
  tile: Phaser.Tilemaps.Tile,
) => {
  const charWidth = settings.character.width
  const result: IDirection = {}
  const charX = character.x - settings.character.width / 2
  // const tileX = tile.pixelX * settings.tile.scaling

  const charY = character.y
  // const tileY = tile.pixelY * settings.tile.scaling

  const rightWall = tileMapping.wall.vertical.right.includes(tile.index)
  const rightBotomCorner = tileMapping.wall.corner.bottom.right.includes(
    tile.index,
  )
  const rightTopCorner = tileMapping.wall.corner.top.right.includes(tile.index)

  const leftWall = tileMapping.wall.vertical.left.includes(tile.index)

  if (rightWall) {
    result.right = true
  }

  // console.log('charX@', charX)
  // console.log('tileX', tileX)
  // if (leftWall && charX < tileX + 16) {
  if (leftWall) {
    result.left = true
  }
  return result
}
