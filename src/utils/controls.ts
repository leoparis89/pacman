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
    console.log('RIGHT!!')
    character.setVelocityX(160)
  } else if (cursorDir.left && !stop.left) {
    console.log('RIGHT!!')
    character.setVelocityX(-160)
  } else {
    console.log('STOOOPPP')
    character.setVelocityX(0)
  } //     character.setVelocityX(-160)

  if (cursorDir.up && !stop.right) {
    console.log('RIGHT!!')
    character.setVelocityY(-160)
  } else if (cursorDir.down && !stop.down) {
    console.log('RIGHT!!')
    character.setVelocityY(160)
  } else {
    console.log('STOOOPPP')
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
  const result: IDirection = {}
  const charX = character.x
  const tileX = tile.pixelX * 3
  const charY = character.y
  const tileY = tile.pixelY * 3

  const rightWall = tileMapping.wall.vertical.right.includes(tile.index)
  const rightCorner = tileMapping.wall.corner.bottom.right.includes(tile.index)

  if ((rightWall || rightCorner) && charX > tileX) {
    result.right = true
  }

  return result
}
