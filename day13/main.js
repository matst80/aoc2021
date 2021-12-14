const {
  seq,
  log,
  makeGrid,
  gridLoop,
  extent,
  formatGrid,
} = require("../common.js");
const { foldSwitch } = require("../fold.js");

const transform = (input) => {
  let hasSplitted = false;
  const lines = input.split("\n");
  const coors = [];
  const folds = [];
  lines.forEach((d) => {
    if (d.length < 2) {
      hasSplitted = true;
      return;
    }
    if (!hasSplitted) {
      const [x, y] = d.split(",").toNumber();
      coors.push({ x, y });
    } else {
      const [_, direction, nr] = d.match(/ (.)=(\d+)/);
      folds.push({ horizonal: direction === "x", nr: Number(nr) });
    }
  });
  return { coors, folds, size: extent(coors) };
};

const part1 = ({ coors, folds, size }) => {
  const { width, height } = size;
  let grid = makeGrid(width + 1, height + 1);

  coors.forEach(({ x, y }) => (grid[y][x] = 1));

  folds.slice(0, 1).forEach((d) => (grid = foldSwitch(d, grid)));

  return grid.flat().reduce((sum, i) => sum + (i > 0 ? 1 : 0), 0);
};

const part2 = ({ coors, folds, size }) => {
  const { width, height } = size;
  let grid = makeGrid(width + 1, height + 1);

  coors.forEach(({ x, y }) => (grid[y][x] = 1));

  folds.forEach((d) => (grid = foldSwitch(d, grid)));
  log(formatGrid(grid, (d) => d > 0));

  return grid.flat().reduce((sum, i) => sum + (i > 0 ? 1 : 0), 0) + 1;
};

module.exports = {
  transform,
  part1,
  part2,
  test: 0,
};
