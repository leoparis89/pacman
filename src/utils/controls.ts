export const handleCursor = (
  cursors: Phaser.Types.Input.Keyboard.CursorKeys,
  character: Phaser.Physics.Arcade.Sprite,
) => {
  if (cursors.left!.isDown) {
    character.setVelocityX(-160)
  } else if (cursors.right!.isDown) {
    // if (stop) {
    //   char.setVelocityX(0)
    //   return
    // }
    character.setVelocityX(160)
  } else if (cursors.up!.isDown) {
    character.setVelocityY(-160)
  } else if (cursors.down!.isDown) {
    character.setVelocityY(160)
  } else {
    character.setVelocityX(0)
    character.setVelocityY(0)
  }
}