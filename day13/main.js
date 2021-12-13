const {
    seq,
    log,
    makeGrid,
    gridLoop,
    extentArray,
    numbers,
    numberGrid,
    charGrid,
    extent,
    formatGrid,
    tlog,
} = require("../common.js");

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
            folds.push({ direction, nr: Number(nr) });
        }
    });
    return { coors, folds, size: extent(coors) };
};

const fold = (grid, width, height, addFn) => {
    const result = makeGrid(width, height);
    gridLoop({ top: 0, left: 0, height, width }, (x, y, value) => {
        result[y][x] = (addFn(x, y) + value) > 0 ? 1 : 0;
    }, grid);
    return result;
}

const foldY = (grid, height) => {
    const orgHeight = grid.length - 1;
    const diff = (orgHeight / 2 !== height) ? 1 : 0;

    return fold(grid, grid[0].length, height, (x, y) => grid[(orgHeight - diff) - y][x]);

};

const foldX = (grid, width) => {
    const orgWidth = grid[0].length - 1;

    return fold(grid, width, grid.length, (x, y) => grid[y][orgWidth - x]);
};

const part1 = ({ coors, folds, size }) => {
    const { width, height } = size;
    let grid = makeGrid(width + 1, height + 1);

    const draw = ({ x, y }) => (grid[y][x] = 1);
    coors.forEach(draw);

    const [a] = folds;

    [a].forEach(({ direction, nr }) => {
        grid = direction === "y" ? foldY(grid, nr) : foldX(grid, nr);
    });

    return grid.flat().reduce((sum, i) => sum + (i > 0 ? 1 : 0), 0);

};

const part2 = ({ coors, folds, size }) => {
    const { width, height } = size;
    let grid = makeGrid(width + 1, height + 1);

    const draw = ({ x, y }) => (grid[y][x] = 1);
    coors.forEach(draw);

    folds.forEach(({ direction, nr }) => {
        grid = direction === "y" ? foldY(grid, nr) : foldX(grid, nr);
    });
    console.log(formatGrid(grid, (d) => d > 0));

    return grid.flat().reduce((sum, i) => sum + (i > 0 ? 1 : 0), 0) + 1;
};

module.exports = {
    transform,
    part1,
    part2,
    test: 0,
};
