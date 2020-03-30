export default {
  blue: {
    floor: {
      clean: [5, 21],
      broken: [6, 22],
      tile: [7, 23],
    },
    wall: {
      horizontal: {
        clean: [2],
        cracked: [36, 37],
      },
      vertical: {
        clean: [32],
        cracked: [4, 35],
      },
      deadEnd: {
        bottom: [50],
        top: [33],
        left: [18],
        right: [17],
      },
      corner: {
        bottom: {
          left: [48],
          right: [51],
        },
        top: {
          left: [0],
          right: [3],
        },
      },
    },
  },
}
