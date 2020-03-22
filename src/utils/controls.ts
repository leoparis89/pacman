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
    character.anims.play('right', true)
    character.setVelocityX(160)
  } else if (cursorDir.left) {
    character.anims.play('left', true)
    character.setVelocityX(-160)
  } else {
    // character.anims.stop()
    character.setVelocityX(0)
  } //     character.setVelocityX(-160)

  if (cursorDir.up && !stop.right) {
    character.anims.play('up', true)
    character.setVelocityY(-160)
  } else if (cursorDir.down && !stop.down) {
    character.anims.play('down', true)
    character.setVelocityY(160)
  } else {
    character.anims.stopOnRepeat()
    character.setVelocityY(0)
  }
}
