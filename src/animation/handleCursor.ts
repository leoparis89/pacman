export const handleCursor = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  character: Phaser.Physics.Arcade.Sprite,
) => {
  const cursorDir: IDirection = {
    up: cursors.up!.isDown,
    down: cursors.down!.isDown,
    left: cursors.left!.isDown,
    right: cursors.right!.isDown,
  }

  const { up, down, left, right } = cursorDir

  if (right) {
    character.anims.play('right', true)
    character.setVelocityX(160)
    return
  }

  if (left) {
    character.anims.play('left', true)
    character.setVelocityX(-160)
    return
  }

  if (up) {
    character.anims.play('up', true)
    character.setVelocityY(-160)
    return
  }

  if (down) {
    character.anims.play('down', true)
    character.setVelocityY(160)
    return
  }

  character.setVelocityX(0)
  character.setVelocityY(0)
  character.anims.stop()
}
