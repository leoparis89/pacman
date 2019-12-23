import { handleWallCollision } from './controls'

describe.skip('handleWallCollision', () => {
  it('should rerturn a stop right if char is beyond right bounds on right wall', () => {
    const character = { x: 100 } as Phaser.Physics.Arcade.Sprite
    const tile = { index: 224, pixelX: 30 } as Phaser.Tilemaps.Tile
    expect(handleWallCollision(character, tile)).toEqual({ right: true })
  })

  it('should not rerturn a stop right if char is  not beyond right bounds on right wall', () => {
    const character = { x: 80 } as Phaser.Physics.Arcade.Sprite
    const tile = { index: 224, pixelX: 30 } as Phaser.Tilemaps.Tile
    expect(handleWallCollision(character, tile)).toEqual({})
  })
})
