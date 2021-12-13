const { makeGrid, gridLoop } = require("./common.js");

const fold = (grid, width, height, addFn) => {
  const result = makeGrid(width, height);
  gridLoop(
    { top: 0, left: 0, height, width },
    (x, y, value) => {
      result[y][x] = addFn(x, y) + value > 0 ? 1 : 0;
    },
    grid
  );
  return result;
};

const foldY = (grid, height) => {
  const orgHeight = grid.length - 1;
  const diff = orgHeight / 2 !== height ? 1 : 0;

  return fold(
    grid,
    grid[0].length,
    height,
    (x, y) => grid[orgHeight - diff - y][x]
  );
};

const foldX = (grid, width) => {
  const orgWidth = grid[0].length - 1;
  return fold(grid, width, grid.length, (x, y) => grid[y][orgWidth - x]);
};

const foldSwitch = ({ horizonal, nr }, grid) =>
  horizonal ? foldX(grid, nr) : foldY(grid, nr);

module.exports = {
  foldX,
  foldY,
  foldSwitch,
};
