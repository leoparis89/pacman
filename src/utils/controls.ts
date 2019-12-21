import tileMapping from './tileMapping'

export const handleCursor = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  character: Phaser.Physics.Arcade.Sprite,
  stop: IStop,
) => {
  console.log(stop.right)

  if (cursors.left!.isDown) {
    character.setVelocityX(-160)
  } else if (cursors.right!.isDown) {
    character.setVelocityX(160)
  } else if (cursors.up!.isDown) {
    character.setVelocityY(-160)
  } else if (cursors.down!.isDown) {
    character.setVelocityY(160)
  } else {
    character.setVelocityX(0)
    character.setVelocityY(0)
  }

  if (stop.right) {
    character.setVelocityX(0)
  }
  console.log(cursors)
}

export const handleWallCollision = (
  character: Phaser.Physics.Arcade.Sprite,
  tile: Phaser.Tilemaps.Tile,
) => {
  const result: IStop = {}
  const charX = character.x
  const tileX = tile.pixelX * 3
  const charY = character.y
  const tileY = tile.pixelY * 3

  const rightWall = tileMapping.wall.vertical.right.indexOf(tile.index) !== -1

  if (rightWall && charX > tileX) {
    result.right = true
  }

  return result
}
