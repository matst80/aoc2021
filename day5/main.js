const { seq, chars, lower, extentLines, manhattan, stepper, numbers } = require('../common.js');

const getStepAndLength = ({ x1, y1, x2, y2 }) => {
    const length = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    const xs = x2 == x1 ? 0 : x2 > x1 ? 1 : -1;
    const ys = y2 == y1 ? 0 : y2 > y1 ? 1 : -1;
    return { length, xs, ys };
};

const splitToCoords = (line) => {
    const [_, x1, y1, x2, y2] = line
        .match(/([0-9]+)\,([0-9]+) -> ([0-9]+)\,([0-9]+)/)
        .toNumber();

    const coords = { x1, y1, x2, y2, };

    return { ...coords, ...getStepAndLength(coords) };
};

const draw = (grid, width, drawDiagonal) => ({ x1, y1, xs, ys, length }) => {
    if (drawDiagonal || (xs == 0 || ys == 0))
        for (var step = 0; step <= length; step++) {
            const x = step * xs + x1;
            const y = step * ys + y1;

            grid[y * width + x] += 1;
        }
};


const countMultiples = (sum, i) => (i > 1) ? sum + 1 : sum;

const transform = input => input.split('\n').map(splitToCoords);

const part1 = (data) => {

    const { width, height } = extentLines(data);
    const grid = new Array(width * height + width).fill(0);

    data.forEach(draw(grid, width, false));

    return grid.reduce(countMultiples, 0);
}

const part2 = (data) => {
    const { width, height } = extentLines(data);
    const grid = new Array(width * height + width).fill(0);

    data.forEach(draw(grid, width, true));

    return grid.reduce(countMultiples, 0);
}

module.exports = {
    transform, part1, part2
}